// Script to list all platforms in the Firestore database
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs } = require('firebase/firestore');
require('dotenv').config({ path: '.env.local' });

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function listPlatforms() {
  try {
    const platformsRef = collection(db, 'platforms');
    const snapshot = await getDocs(platformsRef);
    
    if (snapshot.empty) {
      console.log('No platforms found in the database.');
      return;
    }
    
    console.log(`Found ${snapshot.size} platforms:`);
    snapshot.forEach(doc => {
      const platform = doc.data();
      console.log(`ID: ${doc.id}, Name: ${platform.name}, Category: ${platform.category}`);
    });
  } catch (error) {
    console.error('Error listing platforms:', error);
  }
}

listPlatforms();
