import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { 
  createUserWithEmailAndPassword, 
  GoogleAuthProvider, 
  FacebookAuthProvider,
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  signOut, 
  updateProfile 
} from "firebase/auth";
import { auth } from "../firebase/firebase.init";

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
  
    const signInGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    };

    const signInFacebook = () => {
        setLoading(true);
        return signInWithPopup(auth, facebookProvider);
    };

    const login = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const register = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const userDataUpdate = (userInfo) => {
        setLoading(true);
        return updateProfile(auth.currentUser, userInfo);
    };

    const signOutUser = () => {
        setLoading(true);
        return signOut(auth);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            // You can handle user state changes here if needed
            setUser(currentUser);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const authInfo = {
        signInGoogle,
        signInFacebook,
        signOutUser,
        user,
        loading,
        login,
        register,
        userDataUpdate,
    };

  return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvider;