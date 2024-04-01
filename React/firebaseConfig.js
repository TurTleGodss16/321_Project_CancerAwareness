import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBezqGlFu4aSYxANzcNW1pfntTEruaEPRY",
  authDomain: "cancerawareness-41508.firebaseapp.com",
  projectId: "cancerawareness-41508",
  storageBucket: "cancerawareness-41508.appspot.com",
  messagingSenderId: "552731092988",
  appId: "1:552731092988:android:9c183bc01cf0ffd579f479",
  // MeasurementId is optional
  // measurementId: "G-MEASUREMENT_ID",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
