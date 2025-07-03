// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from "firebase/firestore";
import { getEnvironments } from '../helpers/getEnvironments';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


const {
  VITE_APIKEY,
  VITE_AUTHDOMAIN,
  VITE_DATABASEURL,
  VITE_PROJECTID,
  VITE_STORAGEBUCKET,
  VITE_MESSAGINGSENDERID,
  VITE_APPID,
} = getEnvironments();


// Production
/*
const firebaseConfig = {
  apiKey: "AIzaSyCcBKAa1G7KFSKNHLAWWn9_LPSfTbpqhZE",
  authDomain: "react-project-a0d03.firebaseapp.com",
  projectId: "react-project-a0d03",
  storageBucket: "react-project-a0d03.firebasestorage.app",
  messagingSenderId: "1083412360273",
  appId: "1:1083412360273:web:ea6ed77dda06f1f3325c70"
};

// Testing

const firebaseConfig = {
  apiKey: "AIzaSyACwM5Cr6Ojs4VDmoTkK5oPwxCW9-IxF9Y",
  authDomain: "journal-testing-a71f2.firebaseapp.com",
  projectId: "journal-testing-a71f2",
  storageBucket: "journal-testing-a71f2.firebasestorage.app",
  messagingSenderId: "725745524533",
  appId: "1:725745524533:web:90c9c27c4020320281767c"
};
*/

const firebaseConfig = {
  apiKey: VITE_APIKEY,
  authDomain: VITE_AUTHDOMAIN,
  projectId: VITE_PROJECTID,
  storageBucket: VITE_STORAGEBUCKET,
  messagingSenderId: VITE_MESSAGINGSENDERID,
  appId: VITE_APPID,
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);

export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);
