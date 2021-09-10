import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

var firebaseConfig = {
  apiKey: "AIzaSyArZpZtUpuhVFm1Xsmud9bn0DXB1WVrfl4",
  authDomain: "lex-go-47be5.firebaseapp.com",
  projectId: "lex-go-47be5",
  storageBucket: "lex-go-47be5.appspot.com",
  messagingSenderId: "456634160479",
  appId: "1:456634160479:web:9445ea638aee39b6ed52ea",
  measurementId: "G-CKPKBTW26G",
};
// Initialize Firebase
let app;

if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

export const storage = getStorage(app);
export const db = getFirestore(app);
export const auth = getAuth(app);

export default app;
