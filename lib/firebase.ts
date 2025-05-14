import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA4sFvl7_P-NOqMb_dAkqJOCagVXNsaiKA",
  authDomain: "airdropinder.firebaseapp.com",
  projectId: "airdropinder",
  storageBucket: "airdropinder.appspot.com", // Fixed storage bucket format
  messagingSenderId: "777680799742",
  appId: "1:777680799742:web:649b2f77046b73595aa2af",
  measurementId: "G-TWPGV33WN8"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const storage = getStorage(app);

export { app, db, storage };
