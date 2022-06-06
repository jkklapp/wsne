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
  while (moreResults && !user) {
    const listUsersResult = await listUsers(nextPageToken);
    for (const u in listUsersResult.users) {
      const userRecord = listUsersResult.users[u];
      console.log(
        userRecord.displayName,
        userName,
        userRecord.displayName === userName,
      );
      if (userRecord.displayName === userName) {
        user = userRecord;
        break;
      }
      nextPageToken = listUsersResult.pageToken;
      moreResults = !!nextPageToken;
    }
  }
  return user;
};

export const getByEmail = async (userEmail: string) => {
  return await firebase.auth().getUserByEmail(userEmail);
};
