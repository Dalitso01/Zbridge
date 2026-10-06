// Account helpers — Firebase Auth for sign-in, Firestore "users/{uid}" for profiles.
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  updateProfile,
  signOut as firebaseSignOut,
} from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "./firebase";

// Fields a user may edit on their own profile.
const PROFILE_FIELDS = ["name", "profession", "academicQualification", "phone", "interests", "skills", "avatarUrl"];

export async function signUp({ name, email, password }) {
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(cred.user, { displayName: name });
  await saveProfile(cred.user.uid, { name, email }, { isNew: true });
  return cred.user;
}

export function signIn(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export async function signInWithGoogle() {
  const cred = await signInWithPopup(auth, new GoogleAuthProvider());
  const existing = await loadProfile(cred.user.uid);
  if (!existing) {
    await saveProfile(
      cred.user.uid,
      { name: cred.user.displayName || "", email: cred.user.email, avatarUrl: cred.user.photoURL || "" },
      { isNew: true }
    );
  }
  return cred.user;
}

export function resetPassword(email) {
  return sendPasswordResetEmail(auth, email);
}

export function signOut() {
  return firebaseSignOut(auth);
}

export async function loadProfile(uid) {
  const snap = await getDoc(doc(db, "users", uid));
  return snap.exists() ? snap.data() : null;
}

export async function saveProfile(uid, data, { isNew = false } = {}) {
  const clean = {};
  for (const key of [...PROFILE_FIELDS, "email"]) {
    if (data[key] !== undefined) clean[key] = data[key];
  }
  clean.updatedAt = serverTimestamp();
  if (isNew) clean.createdAt = serverTimestamp();
  await setDoc(doc(db, "users", uid), clean, { merge: true });
}

// Turn Firebase error codes into messages a student can act on.
export function authErrorMessage(err) {
  switch (err?.code) {
    case "auth/invalid-email":
      return "That email address doesn't look right.";
    case "auth/email-already-in-use":
      return "An account with this email already exists. Try signing in instead.";
    case "auth/weak-password":
      return "Please choose a password with at least 6 characters.";
    case "auth/invalid-credential":
    case "auth/wrong-password":
    case "auth/user-not-found":
      return "Email or password is incorrect.";
    case "auth/too-many-requests":
      return "Too many attempts. Please wait a few minutes and try again.";
    case "auth/network-request-failed":
      return "No internet connection. Check your connection and try again.";
    case "auth/popup-closed-by-user":
    case "auth/cancelled-popup-request":
      return "";
    case "auth/popup-blocked":
      return "Your browser blocked the Google sign-in window. Allow pop-ups and try again.";
    default:
      return "Something went wrong. Please try again.";
  }
}
