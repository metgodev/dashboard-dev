import { async } from "@firebase/util";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPhoneNumber,
  RecaptchaVerifier
} from "firebase/auth";


const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

const appVerifier = window.recaptchaVerifier;

const loginWithEmailAndPassword = async (email, password) => {
  return signInWithEmailAndPassword(auth, email, password).catch((error) => {
    const errorCode = error.code.replace(/\//g, "_").replace(/-/g, "_");
  });
};

const registerUserWithEmailAndPassword = async (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password).catch((error) => {
    const errorCode = error.code.replace(/\//g, "_").replace(/-/g, "_");
  });
};

const loginWithPhoneNumber = (phoneNumber) => {
  return signInWithPhoneNumber(auth, phoneNumber, appVerifier);
};

export {
  registerUserWithEmailAndPassword,
  loginWithEmailAndPassword,
  loginWithPhoneNumber
};
