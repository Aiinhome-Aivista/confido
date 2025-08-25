import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider  } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDcNJFFnOOM8KSJzQM8nLsorTZW8S3fBl4",
  authDomain: "confido-17834.firebaseapp.com",
  projectId: "confido-17834",
  storageBucket: "confido-17834.firebasestorage.app",
  messagingSenderId: "872557856166",
  appId: "1:872557856166:web:f59c59f786658144c1fb67",
  measurementId: "G-1KK621VW43"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
facebookProvider.addScope("public_profile");

export { auth, googleProvider, facebookProvider };
