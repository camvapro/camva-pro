// src/scripts/firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore-compat.js";

const firebaseConfig = {
  apiKey: "AIzaSyCcIdjI9oHPz7ckl5cfvbdFTJOAFA5mcAw",
  authDomain: "camva-pro.firebaseapp.com",
  projectId: "camva-pro",
  storageBucket: "camva-pro.appspot.com",
  messagingSenderId: "643952444427",
  appId: "1:643952444427:web:df67984977759e4c42730e"
};

const app = firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();