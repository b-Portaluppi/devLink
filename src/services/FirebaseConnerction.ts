import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDQ3b9_kWjl-o6OkHZ0Ncz7nUwCsrl5I9E",
  authDomain: "reactlinks-56171.firebaseapp.com",
  projectId: "reactlinks-56171",
  storageBucket: "reactlinks-56171.firebasestorage.app",
  messagingSenderId: "86050221366",
  appId: "1:86050221366:web:e6fc654ff5ab3a74d85797"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)

export { auth, db };