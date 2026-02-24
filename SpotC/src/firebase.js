import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Import Firestore

const firebaseConfig = {
  apiKey: "AIzaSyCkYrWAD-NHEyboLlggWxqltfJFI3pJnWA",
  authDomain: "spotc-a25c8.firebaseapp.com",
  projectId: "spotc-a25c8",
  storageBucket: "spotc-a25c8.firebasestorage.app",
  messagingSenderId: "893479473393",
  appId: "1:893479473393:web:0c3c86d16ae1204a449950",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app); // Export Firestore instance
export const googleProvider = new GoogleAuthProvider();