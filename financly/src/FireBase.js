// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
import {getFirestore, doc, setDoc} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBJwineRTOV4wxir4whwY7RY9QuKK6ofYE",
  authDomain: "personal-finance-tracker-fa05d.firebaseapp.com",
  projectId: "personal-finance-tracker-fa05d",
  storageBucket: "personal-finance-tracker-fa05d.appspot.com",
  messagingSenderId: "892820715897",
  appId: "1:892820715897:web:666b2eee332af0bfed97a8",
  measurementId: "G-DGGRNBVWCT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth =getAuth(app);
const provider = new GoogleAuthProvider();

export {db, auth, provider, doc, setDoc};