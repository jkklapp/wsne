import { Injectable, Inject, Logger } from '@nestjs/common';
import * as dayjs from 'dayjs';
import { CollectionReference } from '@google-cloud/firestore';
import { PostDocument, PaginatedResults } from './document';

@Injectable()
export class Service {
  private logger: Logger = new Logger(Service.name);

  constructor(
    @Inject(PostDocument.collectionName)
    private postsCollection: CollectionReference<PostDocument>,
  ) {}

  async exists(id: string): Promise<boolean> {
    return this.postsCollection
      .doc(id)
      .get()
      .then((postDoc) => {
        return postDoc.exists;
      });
  }

  async toggleLike(id: string, userId: string, like: boolean) {
    const docRef = this.postsCollection.doc(id);
    return docRef.get().then((postDoc) => {
      const post = postDoc.data();
      const likes = post.likes || [];
      const newLikes = like
        ? [...likes, userId]
        : likes.filter((l) => l !== userId);
      return docRef.update({ likes: newLikes });
    });
  }

  async get(id: string): Promise<PostDocument> {
    return this.postsCollection
      .doc(id)
      .get()
      .then((postDoc) => {
        const docId = postDoc.id;
        const post = postDoc.data();

        return {
          ...post,
          id: docId,
        };
      });
  }

  async getMultiple(
    limit: number,
    startAfter?: string | undefined,
  ): Promise<PaginatedResults> {
    const _startAfter = startAfter ? parseInt(startAfter, 10) : '';
    const noMoreResults = startAfter ? -1 : null;
    return this.postsCollection
      .orderBy('date', 'desc')
      .startAfter(_startAfter)
      .limit(limit)
      .get()
      .then(async (snapshot) => {
        const results: PostDocument[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        const q = await snapshot.query.offset(limit).get();

        return {
          results,
          nextPageToken: q.empty
            ? noMoreResults
            : results[results.length - 1].date,
        };
      });
  }

  async countAllforUserByDate(userId: string, date: number) {
    return this.postsCollection
      .where('userId', '==', userId)
      .where('date', '>=', date)
      .get()
      .then((snapshot) => snapshot.size);
  }

  async create(message: string, userId: string): Promise<PostDocument> {
    const t = dayjs(new Date()).valueOf();
    const docRef = this.postsCollection.doc(t.toString());
    await docRef.set({
      message,
      date: new Date().getTime(),
      userId,
    });

    return docRef.get().then((postDoc) => {
      const docId = postDoc.id;
      const post = postDoc.data();

      return {
        ...post,
        id: docId,
      };
    });
  }
}
