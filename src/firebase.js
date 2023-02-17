// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyC1jrqQpLwQOO2B9iU1zB21dwoYJwU820Y',
  authDomain: 'sendlinks-1b88d.firebaseapp.com',
  projectId: 'sendlinks-1b88d',
  storageBucket: 'sendlinks-1b88d.appspot.com',
  messagingSenderId: '368027098828',
  appId: '1:368027098828:web:e85f808cc603c6f2a6ec69',
  measurementId: 'G-Z5485KJMJ3',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;

