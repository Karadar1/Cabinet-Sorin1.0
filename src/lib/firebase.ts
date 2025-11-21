// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB1nO06n4V3yst7NVtiG_IvvfmFzhqleqk",
  authDomain: "cabinetsorin-ab33c.firebaseapp.com",
  projectId: "cabinetsorin-ab33c",
  storageBucket: "cabinetsorin-ab33c.firebasestorage.app",
  messagingSenderId: "187790871284",
  appId: "1:187790871284:web:d71cefb629155ae2d76ca1",
  measurementId: "G-XCEXST6S0E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);