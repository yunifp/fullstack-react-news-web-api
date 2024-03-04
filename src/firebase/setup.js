
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
import {getFirestore} from "firebase/firestore"


const firebaseConfig = {
  apiKey: "AIzaSyD7jLqkzpTzC26k-8USVknWdPJknkN78sQ",
  authDomain: "dukuhwaluh-d9801.firebaseapp.com",
  projectId: "dukuhwaluh-d9801",
  storageBucket: "dukuhwaluh-d9801.appspot.com",
  messagingSenderId: "702468236306",
  appId: "1:702468236306:web:6adafa9031cafa601e64cb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider(app)
export const database = getFirestore(app)