"use client"

import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithRedirect,
  signOut,
  onAuthStateChanged,
  updateProfile,
  reload,
} from "firebase/auth";
import { auth } from "../../authentication";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState();

  const createUser = async (email, password, userName) => {
    await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(auth.currentUser, {displayName: userName})
  };

  const signIn = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const googleSignIn = async () => {
    const Provider = new GoogleAuthProvider();
    await signInWithRedirect(auth, Provider);
  };

  const logOut = async () => {
    await signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  });

  useEffect(() => {
    const createUserDB = async () =>{
      const tempUser = [
          user.uid,
          user.email,
          user.displayName,
          false
      ];

      await fetch("http://localhost:3000/api/user", {
          method: "POST",
          body: JSON.stringify({
            user: tempUser,
          }),
          headers: {
            "Content-Type": "application/json",
          },
      });
    } 

    if(user && user != null){
      if(user.displayName != null){
        const metadata = user.metadata;
        if(metadata.creationTime == metadata.lastSignInTime){
          createUserDB();
        }
      }
    }
  }, [user])

  return (
    <AuthContext.Provider
      value={{ user, createUser, signIn, googleSignIn, logOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
