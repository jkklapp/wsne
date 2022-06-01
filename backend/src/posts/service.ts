import { Injectable, Inject, Logger } from '@nestjs/common';
import * as dayjs from 'dayjs';
import { CollectionReference, Timestamp } from '@google-cloud/firestore';
import { PostDocument, PostDocumentResult } from './document';

@Injectable()
export class Service {
  private logger: Logger = new Logger(Service.name);

  constructor(
    @Inject(PostDocument.collectionName)
    private postsCollection: CollectionReference<PostDocument>,
  ) {}

  async findAll(limit, startAfter): Promise<PostDocumentResult> {
    const _startAfter = startAfter ? parseInt(startAfter, 10) : '';
    const snapshot = await this.postsCollection
      .orderBy('date', 'desc')
      .startAfter(_startAfter)
      .limit(limit)
      .get();
    const posts: PostDocument[] = [];
    snapshot.forEach((doc) => {
      posts.push(doc.data());
    });
    const q = await snapshot.query.offset(limit).get();

    const noMoreResults = startAfter ? -1 : null;

    return {
      results: posts.slice(),
      nextPageToken: q.empty ? noMoreResults : posts[posts.length - 1].date,
    };
  }

  async create({ message }, userId): Promise<PostDocument> {
    const t = dayjs(new Date()).valueOf();
    const date = Timestamp.fromMillis(t);
    const docRef = this.postsCollection.doc(t.toString());
    await docRef.set({
      message,
      date: date.seconds,
      author: userId,
    });
    const postDoc = await docRef.get();
    const post = postDoc.data();
    return post;
  }
}
