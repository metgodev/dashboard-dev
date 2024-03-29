import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPhoneNumber,
  RecaptchaVerifier,
  sendPasswordResetEmail
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
console.log(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

const loginWithEmailAndPassword = async (email, password) => {
  return signInWithEmailAndPassword(auth, email, password)
};

const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email)
    return true
  } catch (e) {
    console.log(e)
    return false
  }
}

const registerUserWithEmailAndPassword = async (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password)
};

const loginWithPhoneNumber = async (phoneNumber) => {
  window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', { 'size': 'invisible', }, auth);
  const rever = window.recaptchaVerifier
  return signInWithPhoneNumber(auth, phoneNumber, rever);
};

export {
  registerUserWithEmailAndPassword,
  loginWithEmailAndPassword,
  loginWithPhoneNumber,
  resetPassword
};
