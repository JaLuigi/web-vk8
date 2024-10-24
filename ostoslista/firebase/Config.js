import { initializeApp } from "firebase/app"
import { getFirestore, collection,addDoc,serverTimestamp } from "firebase/firestore"

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "ostoslista-2cee5.firebaseapp.com",
  projectId: "ostoslista-2cee5",
  storageBucket: "ostoslista-2cee5.appspot.com",
  messagingSenderId: "294332066783",
  appId: "1:294332066783:web:54b22cddd104832c38b26a"
};

initializeApp(firebaseConfig);

const firestore = getFirestore();

const MESSAGES = 'messages';

export {
    firestore,
    collection,
    addDoc,
    serverTimestamp,
    MESSAGES
}

