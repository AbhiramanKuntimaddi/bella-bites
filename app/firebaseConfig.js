import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC3EdOXxNTn0EPkfnO6x7-5pA0ZgqFd3WY",
  authDomain: "bellabites-dfd7d.firebaseapp.com",
  projectId: "bellabites-dfd7d",
  storageBucket: "bellabites-dfd7d.appspot.com",
  messagingSenderId: "334332815591",
  appId: "1:334332815591:web:f7b3ca28b9b7c2f4619a42",
  measurementId: "G-MR8VY6BHLZ"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
