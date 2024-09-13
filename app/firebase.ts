// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Add this import
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCprMKYaGdiwQdRTQZm-KNnegYK9a_5ZWQ",
  authDomain: "tmu-college-club.firebaseapp.com",
  projectId: "tmu-college-club",
  storageBucket: "tmu-college-club.appspot.com",
  messagingSenderId: "590590667315",
  appId: "1:590590667315:web:48e5b9364f9f36934fd146",
  // Removed measurementId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Add this line
const db = getFirestore(app);

export { app, auth, db }; // Export the necessary modules
