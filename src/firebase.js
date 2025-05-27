import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/analytics';
import 'firebase/compat/firestore'; // <-- Add this line

const firebaseConfig = {
  apiKey: "AIzaSyC3CtIX1VLcjl_EZTx8wehiXWQF8A4Ds0g", // <-- your real API key
  authDomain: "zbridge-f1887.firebaseapp.com",
  projectId: "zbridge-f1887",
  storageBucket: "zbridge-f1887.appspot.com",
  messagingSenderId: "780403796560",
  appId: "1:780403796560:web:5035340a8b2c468f663f55",
  measurementId: "G-JV7Y7V21XJ"
};

const app = firebase.apps.length
  ? firebase.app()
  : firebase.initializeApp(firebaseConfig);

export default app;