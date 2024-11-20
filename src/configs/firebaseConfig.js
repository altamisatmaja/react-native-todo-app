// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB3Qcs0IfpZQPqnxqhh42TYqBrLrwrzF0I",
  authDomain: "todolist-9ab23.firebaseapp.com",
  projectId: "todolist-9ab23",
  storageBucket: "todolist-9ab23.firebasestorage.app",
  messagingSenderId: "664335793277",
  appId: "1:664335793277:web:7a01d1d7fb1fee53fdc514",
  measurementId: "G-Y5QBK945HC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };