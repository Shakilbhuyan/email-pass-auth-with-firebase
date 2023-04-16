// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDzIv5H0ibGoXdXv9l7RM01FnygRbBPxy0",
  authDomain: "email-password-auth-63377.firebaseapp.com",
  projectId: "email-password-auth-63377",
  storageBucket: "email-password-auth-63377.appspot.com",
  messagingSenderId: "539447668735",
  appId: "1:539447668735:web:b82da2acc4b5f0d8edc1ca",
  measurementId: "G-R2K9BL3PD3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;