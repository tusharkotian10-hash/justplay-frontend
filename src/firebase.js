// src/firebase.js
// Firebase setup for Google Sign-In

import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';

const firebaseConfig = {
  apiKey:       import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain:   import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId:    import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId:        import.meta.env.VITE_FIREBASE_APP_ID,
};

const app  = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Sign in with Google popup
export async function signInWithGoogle() {
  const result = await signInWithPopup(auth, provider);
  return result.user;
}

// Sign out
export async function signOutUser() {
  await signOut(auth);
}

// Get current user's fresh ID token (sent to backend for auth)
export async function getIdToken() {
  const user = auth.currentUser;
  if (!user) throw new Error('Not logged in');
  return user.getIdToken(/* forceRefresh */ false);
}

// Watch auth state changes
export function onAuthChange(callback) {
  return onAuthStateChanged(auth, callback);
}

export { auth };
