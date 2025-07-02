import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAyoWlcerSvJTZLdKzRfjI9th93rsmTU8c",
  authDomain: "note-bearer.firebaseapp.com",
  databaseURL: "https://note-bearer-default-rtdb.firebaseio.com",
  projectId: "note-bearer",
  storageBucket: "note-bearer.firebasestorage.app",
  messagingSenderId: "633580913059",
  appId: "1:633580913059:web:1360d3c01217c45ba55a16",
  measurementId: "G-XP5SQ08L7T"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
export const databaseURL = firebaseConfig.databaseURL;
