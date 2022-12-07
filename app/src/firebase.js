import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA-DcLngBnB0d3gFlabQe1OT_tHyFSzagY",
  authDomain: "chat-2a8e4.firebaseapp.com",
  projectId: "chat-2a8e4",
  storageBucket: "chat-2a8e4.appspot.com",
  messagingSenderId: "668237694262",
  appId: "1:668237694262:web:8fbc81f21fdd8bdd581f97",
  returnSecureToken: true,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
