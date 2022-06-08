export class NewPostDocument {
  message: string;
  parentId?: string;
}

export class PostDocument {
  static collectionName = 'posts';

  message: string;
  date: number;
  userId: string;
  id?: string;
  likes?: string[];
  parentId?: string;
}

export class PaginatedResults {
  results: PostDocument[];
  nextPageToken: number | null;
}

export class PostDocumentResult {
  results: ResolvedPostDocument[];
  nextPageToken: number | null;
  remainingMessages: number;
}

export class ResolvedPostDocument {
  userName: string;
  message: string;
  date: number;
  userId: string;
  id?: string;
  likes: number;
  likedByMe: boolean;
  comments: number;
}

export class UpdatePostDocument {
  like: boolean;
}
