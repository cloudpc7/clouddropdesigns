// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA_un5f5G8FXpVwbdILCdksFe3ojKT6Sh4",
  authDomain: "clouddropdesigns.firebaseapp.com",
  projectId: "clouddropdesigns",
  storageBucket: "clouddropdesigns.firebasestorage.app",
  messagingSenderId: "415042850938",
  appId: "1:415042850938:web:610ab9dd8de39ac3fc6bc3",
  measurementId: "G-76G5WWR53H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);