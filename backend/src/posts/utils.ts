import * as firebase from 'firebase-admin';

export const getDisplayNameByUserId = async (
  authorId: string,
): Promise<string> => {
  return await firebase
    .auth()
    .getUser(authorId)
    .then(({ displayName }) => displayName);
};
