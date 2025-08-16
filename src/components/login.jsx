import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaGoogle, FaFacebookF } from "react-icons/fa";
import { auth, googleProvider, facebookProvider } from "../firebaseConfig";
import { signInWithPopup, getAdditionalUserInfo } from "firebase/auth";
import Header from "./header";

export default function Login() {
  const location = useLocation();
  const navigate = useNavigate();

  const avatar = location.state?.avatar || {
    name: "Default",
    img: "https://via.placeholder.com/150",
  };

  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const userEmail = result.user.email;
      const userName = result.user.displayName || "User";

      setEmail(userEmail);
      setDisplayName(userName);

      localStorage.setItem("email", userEmail);
      localStorage.setItem("displayName", userName);

      navigate("/chat");
    } catch (error) {
      console.error("Google Sign-In Error:", error);
    }
  };

  const handleFacebookLogin = async () => {
    try {
      const result = await signInWithPopup(auth, facebookProvider);
      const info = getAdditionalUserInfo(result);
      const userEmail = result.user.email;
      const userName = result.user.displayName || info?.profile?.name || "User";

      setEmail(userEmail);
      setDisplayName(userName);

      localStorage.setItem("email", userEmail);
      localStorage.setItem("displayName", userName);

      navigate("/chat");
    } catch (error) {
      console.error("Facebook Sign-In Error:", error);
    }
  };

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    const storedName = localStorage.getItem("displayName");
    if (storedEmail) setEmail(storedEmail);
    if (storedName) setDisplayName(storedName);
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
          <button
            onClick={handleFacebookLogin}
            className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-300 transition"
          >
            <FaFacebookF className="text-gray-600" size={20} />
          </button>
        </div>

        {/* Show logged-in info */}
        {(email || displayName) && (
          <p className="text-sm text-gray-600 mt-2">
            Signed in as <strong>{displayName || email}</strong>
          </p>
        )}
      </div>
    </div>
  );
}
