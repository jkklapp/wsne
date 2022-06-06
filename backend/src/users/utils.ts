import * as firebase from 'firebase-admin';

export const getByUserName = async (userName, nextPageToken = null) => {
  // List batch of users, 1000 at a time.
  return await firebase
    .auth()
    .listUsers(1000, nextPageToken)
    .then((listUsersResult) => {
      listUsersResult.users.forEach((userRecord) => {
        if (userRecord.displayName === userName) {
          return userRecord;
        }
      });
      if (listUsersResult.pageToken) {
        // List next batch of users.
        getByUserName(userName, listUsersResult.pageToken);
      }
      return null;
    })
    .catch((error) => {
      console.log('Error listing users:', error);
    })
    .finally(() => false);
};

export const getByEmail = async (userEmail: string) => {
  return await firebase.auth().getUserByEmail(userEmail);
};
