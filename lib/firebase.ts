import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: "book-nook-6fe80.firebaseapp.com",
  projectId: "book-nook-6fe80",
  storageBucket: "book-nook-6fe80.firebasestorage.app",
  messagingSenderId: "1011726769625",
  appId: "1:1011726769625:web:eddec113f87b5572f0cdc8",
  measurementId: "G-MMM04KX23J",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
