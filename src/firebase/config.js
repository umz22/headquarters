// Firebase
import { initializeApp} from 'firebase/app';
// Firestore services
import {getFirestore, collection} from 'firebase/firestore';
// user auth
import { getAuth } from 'firebase/auth'
// timestamp
import { serverTimestamp } from "@firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAsICQR6O31pyo-tqr1TE45Bfja4TRKSKQ",
    authDomain: "my-headquarters.firebaseapp.com",
    projectId: "my-headquarters",
    storageBucket: "my-headquarters.appspot.com",
    messagingSenderId: "900700752589",
    appId: "1:900700752589:web:8ea894141f6fd30db67784"
  };

// initialize firebase
initializeApp(firebaseConfig)

// initialize services
const db = getFirestore();

// initialize firebase auth 
const auth = getAuth();

// initialize timestamp
const timestamp = serverTimestamp();

export { db, auth, timestamp }