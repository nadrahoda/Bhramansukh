// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAdOZCBM4EI1wpzcQn2IaRT1MnH6L_JRZo",
  authDomain: "bhramansukh-df3a8.firebaseapp.com",
  projectId: "bhramansukh-df3a8",
  storageBucket: "bhramansukh-df3a8.firebasestorage.app",
  messagingSenderId: "591195895633",
  appId: "1:591195895633:web:ffd16e66988cfa3228c570",
  measurementId: "G-CXG0YSCN16"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log("🔥 Firebase initialized successfully:", app);

export const db = getFirestore(app);

// const analytics = getAnalytics(app);