import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCicXfcLDOgy2t-OUHa6D4vbTQ1rA1T4kU",
  authDomain: "hotel-d75ff.firebaseapp.com",
  projectId: "hotel-d75ff",
  storageBucket: "hotel-d75ff.firebasestorage.app",
  messagingSenderId: "436414198473",
  appId: "1:436414198473:web:51ec9e83577c760475d318",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
