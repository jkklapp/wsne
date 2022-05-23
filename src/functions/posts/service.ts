import {
  Injectable,
  Inject,
  Logger,
  InternalServerErrorException,
} from '@nestjs/common';
import * as dayjs from 'dayjs';
import { CollectionReference, Timestamp } from '@google-cloud/firestore';
import { PostDocument } from './document';

@Injectable()
export class Service {
  private logger: Logger = new Logger(Service.name);

  constructor(
    @Inject(PostDocument.collectionName)
    private postsCollection: CollectionReference<PostDocument>,
  ) {}

  async create({ title, message }): Promise<PostDocument> {
    const t = dayjs(new Date()).valueOf();
    const date = Timestamp.fromMillis(t);
    const docRef = this.postsCollection.doc(t.toString());
    await docRef.set({
      title,
      message,
      date,
    });
    const postDoc = await docRef.get();
    const post = postDoc.data();
    return post;
  }

  async findAll(): Promise<PostDocument[]> {
    const snapshot = await this.postsCollection.get();
    const posts: PostDocument[] = [];
    snapshot.forEach((doc) => posts.push(doc.data()));
    return posts;
  }
}
