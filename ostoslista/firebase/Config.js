import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyC3GY10JCd6Xjq0a0335CdaqEXj07CuYzo",
  authDomain: "ostoslista-2cee5.firebaseapp.com",
  projectId: "ostoslista-2cee5",
  storageBucket: "ostoslista-2cee5.appspot.com",
  messagingSenderId: "294332066783",
  appId: "1:294332066783:web:54b22cddd104832c38b26a"
};

const app = initializeApp(firebaseConfig);

const firestore = getFirestore();

export {
    firestore
}

