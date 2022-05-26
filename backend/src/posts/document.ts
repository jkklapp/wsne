import { Timestamp } from '@google-cloud/firestore';

export class PostDocument {
  static collectionName = 'posts';

  message: string;
  date: Timestamp;
}
