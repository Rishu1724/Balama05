// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCNnbV9-5XLyyVEBpw7hXM474kJh_vjjC8",
  authDomain: "balama-55eef.firebaseapp.com",
  projectId: "balama-55eef",
  storageBucket: "balama-55eef.firebasestorage.app",
  messagingSenderId: "813525407253",
  appId: "1:813525407253:web:89c340bf813ced49b2e01c",
  measurementId: "G-2P0SYEL0S8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;