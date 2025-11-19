// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAenOE6IsZWu5o9izphfJCOORd-iDenIVY",
  authDomain: "fir-32284.firebaseapp.com",
  projectId: "fir-32284",
  storageBucket: "fir-32284.firebasestorage.app",
  messagingSenderId: "749856620877",
  appId: "1:749856620877:web:361ab4ed38626b2df8b704",
  measurementId: "G-N46Q62W7RS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
