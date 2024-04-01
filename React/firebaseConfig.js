// Firebase v9+ modular imports
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getReactNativePersistence } from 'firebase/auth/react-native';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBezqGlFu4aSYxANzcNW1pfntTEruaEPRY",
  authDomain: "cancerawareness-41508.firebaseapp.com",
  projectId: "cancerawareness-41508",
  storageBucket: "cancerawareness-41508.appspot.com",
  messagingSenderId: "552731092988",
  appId: "1:552731092988:android:9c183bc01cf0ffd579f479",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);


export { auth, firestore };
