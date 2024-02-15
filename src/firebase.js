import { getFirestore } from "firebase/firestore"
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAfpg6cR4le6Y0xDykImldDb5IGbYbVABM",
  authDomain: "homework-6a4c7.firebaseapp.com",
  projectId: "homework-6a4c7",
  storageBucket: "homework-6a4c7.appspot.com",
  messagingSenderId: "945788651445",
  appId: "1:945788651445:web:61fdc9afb582ee7aebbbfc",
  measurementId: "G-M9K13GXKYG"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
