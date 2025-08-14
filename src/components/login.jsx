import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaGoogle, FaFacebookF } from "react-icons/fa";
import { auth, googleProvider } from "../firebaseConfig"; // adjusted path
import { signInWithPopup } from "firebase/auth";
import Header from "./header";

export default function Login() {
  const location = useLocation();
  const navigate = useNavigate();

  const avatar = location.state?.avatar || {
    name: "Default",
    img: "https://via.placeholder.com/150",
  };

  const [email, setEmail] = useState("");

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const userEmail = result.user.email;
      setEmail(userEmail);
      localStorage.setItem("email", userEmail);

      // Redirect after login
      navigate("/chat"); // make sure your route matches this path
    } catch (error) {
      console.error("Google Sign-In Error:", error);
    }
  };

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
        <Header />
      <div className="flex flex-col items-center space-y-6">
        {/* Avatar */}
        <div className="w-28 h-28 md:w-32 md:h-32 rounded-full border border-gray-300 overflow-hidden shadow-md">
          <img
            src={avatar.img}
            alt={avatar.name}
            className="w-full h-full object-cover scale-[2] translate-y-20"
          />
        </div>

        {/* Login label */}
        <p className="text-base font-extrabold text-gray-800 nunito">
          Login here
        </p>

        {/* Social buttons */}
        <div className="flex space-x-4">
          <button
            onClick={handleGoogleLogin}
            className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition"
          >
            <FaGoogle className="text-gray-600" size={20} />
          </button>
          <button className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition">
            <FaFacebookF className="text-gray-300" size={20} />
          </button>
        </div>

        {/* Show logged-in email */}
        {email && (
          <p className="text-sm text-gray-600 mt-2">
            Signed in as <strong>{email}</strong>
          </p>
        )}
      </div>
    </div>
  );
}
