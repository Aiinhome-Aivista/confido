import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider  } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCjnW2YH0bqG70xhnSSzdZT5Z5aQtJ5SyY",
  authDomain: "sign-587c2.firebaseapp.com",
  projectId: "sign-587c2",
  storageBucket: "sign-587c2.appspot.com",
  messagingSenderId: "542340500515",
  appId: "1:542340500515:web:e895e3eb83d960fb3b3596",
  measurementId: "G-LC70ZGL5G3"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
facebookProvider.addScope("public_profile");

export { auth, googleProvider, facebookProvider };
