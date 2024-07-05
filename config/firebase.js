// src/config/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore, serverTimestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyB_6fmxqqw_9PGGWkoM6mciF_w0qTZDrfs",
  authDomain: "ropart-bd824.firebaseapp.com",
  projectId: "ropart-bd824",
  storageBucket: "ropart-bd824.appspot.com",
  messagingSenderId: "884433315121",
  appId: "1:884433315121:web:8785f8a7bc124ff943fc10",
};

const app = initializeApp(firebaseConfig);
const firestoreApp = getFirestore(app);
const authApp = getAuth(app);
const storageApp = getStorage(app);
const timestamp = serverTimestamp();

export { firestoreApp, authApp, storageApp, timestamp };
