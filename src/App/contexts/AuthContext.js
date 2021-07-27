import React, { useContext, useState, useEffect } from "react";

// Firebase Imports
import withFirebaseAuth from "react-with-firebase-auth";
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../../firebaseConfig";

// Firebase setup
const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseAppAuth = firebaseApp.auth();
const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

const AuthProvider = (props) => {
  const { children, signInWithGoogle } = props;
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  //   function signup(email, password) {
  //     return firebaseAppAuth.createUserWithEmailAndPassword(email, password);
  //   }

  function login(email, password) {
    return firebaseAppAuth.signInWithEmailAndPassword(email, password);
  }

  function loginWithGoogle() {
    return signInWithGoogle();
  }

  function logout() {
    return firebaseAppAuth.signOut();
  }

  function resetPassword(email) {
    return firebaseAppAuth.sendPasswordResetEmail(email);
  }

  //   function updateEmail(email) {
  //     return currentUser.updateEmail(email);
  //   }

  //   function updatePassword(password) {
  //     return currentUser.updatePassword(password);
  //   }

  useEffect(() => {
    // cleanup
    const unsubscribe = firebaseAppAuth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    loginWithGoogle,
    // signup,
    logout,
    resetPassword,
    // updateEmail,
    // updatePassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(AuthProvider);
