import { Injectable, Inject, Logger } from '@nestjs/common';
import * as dayjs from 'dayjs';
import { CollectionReference } from '@google-cloud/firestore';
import {
  PostDocument,
  PostDocumentResult,
  ResolvedPostDocument,
} from './document';
import { getDisplayNameByUserId } from './utils';

@Injectable()
export class Service {
  private logger: Logger = new Logger(Service.name);

  constructor(
    @Inject(PostDocument.collectionName)
    private postsCollection: CollectionReference<PostDocument>,
  ) {}

  async findAll(
    limit: number,
    startAfter?: string | undefined,
  ): Promise<PostDocumentResult> {
    const _startAfter = startAfter ? parseInt(startAfter, 10) : '';
    const noMoreResults = startAfter ? -1 : null;
    const snapshot = await this.postsCollection
      .orderBy('date', 'desc')
      .startAfter(_startAfter)
      .limit(limit)
      .get();

    const posts: PostDocument[] = [];
    snapshot.forEach((doc) => {
      posts.push({ id: doc.id, ...doc.data() });
    });

    const resolvedPosts: ResolvedPostDocument[] = [];
    for (const p in posts) {
      resolvedPosts.push({
        ...posts[p],
        userName: await getDisplayNameByUserId(posts[p].userId),
      });
    }

    const q = await snapshot.query.offset(limit).get();

    return {
      results: resolvedPosts.slice(),
      nextPageToken: q.empty ? noMoreResults : posts[posts.length - 1].date,
    };
  }

  async create({ message }, user): Promise<ResolvedPostDocument> {
    const { user_id: userId, name: userName } = user;
    const t = dayjs(new Date()).valueOf();

    const docRef = this.postsCollection.doc(t.toString());
    await docRef.set({
      message,
      date: new Date().getTime(),
      userId,
    });

    const postDoc = await docRef.get();
    const docId = postDoc.id;
    const post = postDoc.data();

    return {
      ...post,
      id: docId,
      userName,
    };
  }
}
