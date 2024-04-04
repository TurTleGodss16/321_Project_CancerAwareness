// Firebase v9+ modular imports
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  // Your Firebase configuration
  apiKey: "AIzaSyBezqGlFu4aSYxANzcNW1pfntTEruaEPRY",
  authDomain: "cancerawareness-41508.firebaseapp.com",
  projectId: "cancerawareness-41508",
  storageBucket: "cancerawareness-41508.appspot.com",
  messagingSenderId: "552731092988",
  appId: "1:552731092988:android:9c183bc01cf0ffd579f479",
};

const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth with custom persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

// Initialize Firestore (if you're using it)
const firestore = getFirestore(app);

export { auth, firestore };
