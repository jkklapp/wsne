import { Timestamp } from '@google-cloud/firestore';

export class PostDocument {
  static collectionName = 'posts';

  title: string;
  message: string;
  date: Timestamp;
}
