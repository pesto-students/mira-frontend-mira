import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
} from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBzreTL2wHM_uGwTQO_DcQFleI2FBV4-CE',
  authDomain: 'mira-v1-2b0a0.firebaseapp.com',
  projectId: 'mira-v1-2b0a0',
  storageBucket: 'mira-v1-2b0a0.appspot.com',
  messagingSenderId: '887158081056',
  appId: '1:887158081056:web:088bf484b65a27b0acde45',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);

export const firebaseSignIn = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const firebaseSignOut = () => {
  return signOut(auth);
};

export const firebaseSendPasswordResetEmail = (email) => {
  return sendPasswordResetEmail(auth, email);
};

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);
