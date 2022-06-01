export class PostDocument {
  static collectionName = 'posts';

  message: string;
  date: number;
  author: string;
}

export class NewPostDocument {
  message: string;
}

export class PostDocumentResult {
  results: PostDocument[];
  nextPageToken?: number;
}
