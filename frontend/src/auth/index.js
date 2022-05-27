import { getAuth as getFirebaseAuth, connectAuthEmulator } from 'firebase/auth';

export const getAuth = () => {
  const auth = getFirebaseAuth();
  if (process.env.NODE_ENV == 'local' && auth.emulatorConfig === null) {
    connectAuthEmulator(auth, 'http://localhost:9099');
  }
  return auth;
};
