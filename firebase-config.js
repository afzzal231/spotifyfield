// js/firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAsyiUCRmhHl-_QqCY3SOii_qQIYO3b-qw",
  authDomain: "spotifyfield-ab794.firebaseapp.com",
  projectId: "spotifyfield-ab794",
  storageBucket: "spotifyfield-ab794.firebasestorage.app",
  messagingSenderId: "489626164960",
  appId: "1:489626164960:web:fc5c600168376f945b7a85",
  measurementId: "G-01ZQLZW277"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
