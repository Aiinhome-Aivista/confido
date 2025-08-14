import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaGoogle, FaFacebookF } from "react-icons/fa";
import { auth, googleProvider } from "../firebaseConfig"; // adjusted path
import { signInWithPopup } from "firebase/auth";
import Header from "./header";
import { POST_url } from "../connection/connection ";
import { apiService } from "../Service/apiService";

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
      const userName = result.user.displayName;
      const loginType = "google";

      // Use apiService instead of fetch
      const data = await apiService({
        url: POST_url.login,
        method: "POST",
        data: {
          name: userName,
          email: userEmail,
          loginType: loginType,
        },
      });

      if (data.status && (data.statusCode === 201 || data.statusCode === 200)) {
        const userData = {
          email: data.data.email,
          name: data.data.name,
          user_id: data.data.user_id,
          loginType: loginType
        };

        // Store all data as one JSON string
        sessionStorage.setItem("user", JSON.stringify(userData));

        if (data.statusCode === 201) {
          console.log("First-time login:", data.message);
        } else if (data.statusCode === 200) {
          console.log("Returning user:", data.message);
        }

        navigate("/chat");
      } else {
        console.error("Login failed:", data.message);
        alert("Login failed: " + data.message);
      }
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      alert("Google login failed. Please try again.");
    }
  };




  useEffect(() => {
    const storedEmail = sessionStorage.getItem("email");
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
