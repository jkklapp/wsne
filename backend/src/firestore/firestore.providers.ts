import { PostDocument } from '../posts/posts.types';

export const FirestoreDatabaseProvider = 'firestoredb';
export const FirestoreOptionsProvider = 'firestoreOptions';
export const FirestoreCollectionProviders: string[] = [
  PostDocument.collectionName,
];
