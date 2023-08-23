import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBgz4EbkNc7x14Ni8LxBRamcLfWbNz0NXg",
  authDomain: "content-generator-gpt.firebaseapp.com",
  projectId: "content-generator-gpt",
  storageBucket: "content-generator-gpt.appspot.com",
  messagingSenderId: "821366672722",
  appId: "1:821366672722:web:8499f286d22f0f524d7e8b"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };