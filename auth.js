// js/auth.js
import { auth, db } from "./firebase-config.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  confirmPasswordReset,
  verifyPasswordResetCode
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
  doc,
  setDoc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// REGISTER USER
export async function registerUser({ name, email, phone, password }) {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);

  // simpan data user ke Firestore
  await setDoc(doc(db, "users", userCredential.user.uid), {
    name,
    email,
    phone,
    role: "user",
    createdAt: new Date()
  });

  return userCredential;
}

// LOGIN
export function login(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

// LOGOUT
export function logout() {
  return signOut(auth);
}

// AUTH STATE LISTENER
export function onAuthStateChange(callback) {
  return onAuthStateChanged(auth, callback);
}

// GET CURRENT USER
export function getCurrentUser() {
  return auth.currentUser;
}

// GET USER DATA FROM FIRESTORE
export async function getUserData(uid) {
  const userDoc = await getDoc(doc(db, "users", uid));
  if (userDoc.exists()) {
    return userDoc.data();
  }
  return null;
}

// RESET PASSWORD
export function resetPassword(email) {
  // Config agar redirect ke halaman kita (opsional, tapi lebih baik diset di Console)
  return sendPasswordResetEmail(auth, email);
}

// VERIFY RESET CODE
export function verifyResetCode(code) {
  return verifyPasswordResetCode(auth, code);
}

// CONFIRM NEW PASSWORD
export function confirmNewPassword(code, newPassword) {
  return confirmPasswordReset(auth, code, newPassword);
}
