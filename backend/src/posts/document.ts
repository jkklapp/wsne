export class NewPostDocument {
  message: string;
}

export class PostDocument extends NewPostDocument {
  static collectionName = 'posts';

  message: string;
  date: number;
  userId: string;
  id?: string;
}

export class PostDocumentResult {
  results: PostDocument[];
  nextPageToken?: number;
}

export class ResolvedPostDocument extends PostDocument {
  userName: string;
}
