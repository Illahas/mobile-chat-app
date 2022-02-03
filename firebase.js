import * as firebase from 'firebase/app';
import * as firestore from 'firebase/firestore';
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyA0WW1Je89ttZvlYdu73s6J56lQJCpVjwg",
    authDomain: "chat-a49af.firebaseapp.com",
    projectId: "chat-a49af",
    storageBucket: "chat-a49af.appspot.com",
    messagingSenderId: "229929892817",
    appId: "1:229929892817:web:b74c04fef9fd6538c97ef0"
  };

const app = firebase.initializeApp(firebaseConfig);

const db = firestore.getFirestore(app);
const auth = getAuth();

export { db, auth, firestore };
