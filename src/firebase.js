// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// (Optional) Analytics – works only in browser with enabled config
import { getAnalytics } from "firebase/analytics";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCWQN6hYNYNlEpRcARdvVWjN6OaeF9YioY",
  authDomain: "dbt-student-portal.firebaseapp.com",
  projectId: "dbt-student-portal",
  storageBucket: "dbt-student-portal.appspot.com",
  messagingSenderId: "310030143946",
  appId: "1:310030143946:web:ac9b891a0ab22e76b97f33",
  measurementId: "G-N390J60NG9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export services you’ll use in the app
export const auth = getAuth(app);       // Firebase Authentication
export const db = getFirestore(app);    // Firestore Database
export const analytics = getAnalytics(app); // Optional

export default app;
