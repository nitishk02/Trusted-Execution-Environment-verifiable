// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const  firebaseConfig = {
    apiKey: "AIzaSyBJ_GGTvp9tqOatwjh0ZZ13O93f0glwGls",
    authDomain: "ethglobal-7d7f6.firebaseapp.com",
    projectId: "ethglobal-7d7f6",
    storageBucket: "ethglobal-7d7f6.firebasestorage.app",
    messagingSenderId: "523477162254",
    appId: "1:523477162254:web:623fa61b4028de9a1c9f5f",
    measurementId: "G-FSJ38P9Q40"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
