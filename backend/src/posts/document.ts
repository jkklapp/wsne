export class NewPostDocument {
  message: string;
}

export class PostDocument extends NewPostDocument {
  static collectionName = 'posts';

  message: string;
  date: number;
  userId: string;
  id?: string;
  likes?: string[];
}

export class PaginatedResults {
  results: PostDocument[];
  nextPageToken: number | null;
}

export class PostDocumentResult extends PaginatedResults {
  remainingMessages: number;
}

export class ResolvedPostDocument extends PostDocument {
  userName: string;
}
