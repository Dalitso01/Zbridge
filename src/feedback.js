// Tester feedback — saved to Firestore "feedback" so it can be read in the Firebase console.
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db, firebaseReady } from "./firebase";

// Public contact address shown on the site (Vercel env var REACT_APP_CONTACT_EMAIL).
export const CONTACT_EMAIL = process.env.REACT_APP_CONTACT_EMAIL || "";

// True when feedback can actually be stored (otherwise we fall back to email).
export const feedbackReady = firebaseReady;

export const FEEDBACK_TYPES = ["Idea", "Something's broken", "Content", "Praise", "Other"];

export async function submitFeedback({ type, rating, message, email, page, simulationId, user }) {
  const entry = {
    type: type || "Other",
    rating: rating || null,
    message: (message || "").trim().slice(0, 2000),
    email: (email || "").trim().slice(0, 200),
    page: page || "",
    simulationId: simulationId || "",
    uid: user?.uid || "",
    name: user?.name || "",
    userAgent: navigator.userAgent.slice(0, 300),
    createdAt: serverTimestamp(),
  };
  await addDoc(collection(db, "feedback"), entry);
}

// Demo-mode fallback: open the visitor's email app with the feedback filled in.
export function feedbackMailto({ type, rating, message, page }) {
  const subject = encodeURIComponent(`ZBRIDGE feedback: ${type || "Other"}`);
  const body = encodeURIComponent(`${message || ""}\n\nRating: ${rating || "-"}/5\nPage: ${page || "-"}`);
  return `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
}
