// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "netflix-gpt-62f80.firebaseapp.com",
  projectId: "netflix-gpt-62f80",
  storageBucket: "netflix-gpt-62f80.firebasestorage.app",
  messagingSenderId: "480666162986",
  appId: "1:480666162986:web:e7a8cd01a9ece7441cb053",
  measurementId: "G-54CHXQMKV7",
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const auth = getAuth();
