import React, { useContext, useEffect, useState } from "react";
import { auth, db } from "./firebase";
import {
  signInWithEmailAndPassword,
  signOut as logOut,
  createUserWithEmailAndPassword,
} from "firebase/auth";

import { doc, getDoc } from "@firebase/firestore";

const AuthContext = React.createContext<any>({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: any) => {
  const [currentUser, setCurrentUser] = useState<any>();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user: any) => {
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  const signUp = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const signIn = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  const signOut = () => {
    return logOut(auth);
  };
  const getUserRole = async () => {
    let userRef = doc(db, `/users/${currentUser && currentUser.uid}`);
    const user = await getDoc(userRef);
    return user.data().role;
  };

  const value = {
    currentUser,
    signUp,
    signIn,
    signOut,
    getUserRole,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
