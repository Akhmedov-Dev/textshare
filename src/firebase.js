import { getFirestore } from "firebase/firestore"
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC1ZQ00jFjKdDzDE_nqK6gsCX0E38LZQbc",
  authDomain: "first-project-24-group.firebaseapp.com",
  projectId: "first-project-24-group",
  storageBucket: "first-project-24-group.appspot.com",
  messagingSenderId: "233578948880",
  appId: "1:233578948880:web:753a850678bc253df65d95",
  measurementId: "G-QFKKXF7VL1"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
