import * as firebase from 'firebase-admin';

const listUsers = (
  nextPageToken?: string,
): Promise<firebase.auth.ListUsersResult> => {
  return firebase.auth().listUsers(1000, nextPageToken);
};

export const getByUserName = async (userName, nextPageToken = undefined) => {
  // List batch of users, 1000 at a time.
  let moreResults = true;
  let user;
  while (moreResults) {
    const listUsersResult = await listUsers(nextPageToken);
    for (const u in listUsersResult.users) {
      const userRecord = listUsersResult.users[u];
      if (userRecord.displayName === userName) {
        user = userRecord;
        break;
      }
    }
    nextPageToken = listUsersResult.pageToken;
    moreResults = !!nextPageToken;
  }
  return user;
};

export const getByEmail = async (userEmail: string) => {
  return firebase.auth().getUserByEmail(userEmail);
};
