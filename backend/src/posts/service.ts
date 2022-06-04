import { Injectable, Inject, Logger } from '@nestjs/common';
import * as dayjs from 'dayjs';
import { CollectionReference } from '@google-cloud/firestore';
import {
  PostDocument,
  PostDocumentResult,
  ResolvedPostDocument,
} from './document';

@Injectable()
export class Service {
  private logger: Logger = new Logger(Service.name);

  constructor(
    @Inject(PostDocument.collectionName)
    private postsCollection: CollectionReference<PostDocument>,
  ) {}

  async getMultiple(
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
    snapshot.docs.forEach((doc) => {
      posts.push({ id: doc.id, ...doc.data() });
    });

    const q = await snapshot.query.offset(limit).get();

    return {
      results: posts.slice(),
      nextPageToken: q.empty ? noMoreResults : posts[posts.length - 1].date,
    };
  }

  async countAllforUserByDate(userId: string, date: number) {
    return this.postsCollection
      .where('userId', '==', userId)
      .where('date', '>=', date)
      .get()
      .then((snapshot) => snapshot.size);
  }

  async create(
    message: string,
    userId: string,
    userName: string,
  ): Promise<ResolvedPostDocument> {
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
