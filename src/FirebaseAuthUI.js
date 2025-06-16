// src/FirebaseAuthUI.js
import React, { useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = { /* your config here */ };
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export function signInWithGoogle() {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
}

const FirebaseAuthUI = () => {
  useEffect(() => {
    console.log("useEffect ran ✅");

    // Use the compat SDK's global auth instance
    const auth = firebase.auth();

    // Initialize or get existing FirebaseUI instance
    const ui =
      firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(auth);

    ui.start('#firebaseui-auth-container', {
      signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID],
      signInSuccessUrl: '/',
    });

    // Cleanup on unmount
    return () => {
      ui.reset();
    };
  }, []);

  return (
    <div>
      <h1>Hello, Firebase UI should appear below 👇</h1>
      <div id="firebaseui-auth-container"></div>
      <div>Test: If you see this, the component is rendering.</div>
    </div>
  );
};

export default FirebaseAuthUI;
