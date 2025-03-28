// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDROLDXBANvVEMMUac9887Kdfs2BH8balQ",
  authDomain: "expo-dev-2cc11.firebaseapp.com",
  projectId: "expo-dev-2cc11",
  storageBucket: "expo-dev-2cc11.firebasestorage.app",
  messagingSenderId: "858048999096",
  appId: "1:858048999096:web:ebe77ea6a4cbc6894bce4d",
  measurementId: "G-WVL16FSN9Z",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);