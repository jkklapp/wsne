import { Timestamp } from '@google-cloud/firestore';

export class PostDocument {
  static collectionName = 'posts';

  message: string;
  date: Timestamp;
  author: string;
}

export class NewPostDocument {
  message: string;
}
