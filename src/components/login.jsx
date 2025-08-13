import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaGoogle, FaFacebookF } from "react-icons/fa";
import Header from "./header";

export default function Login() {
  const location = useLocation();
  const navigate = useNavigate();

  // Get avatar from navigation state, or default
  const avatar = location.state?.avatar || {
    name: "Default",
    img: "https://via.placeholder.com/150", // fallback image
  };

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
        <div className="flex space-x-8">
          <button className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition">
            <FaGoogle className="text-gray-300" size={20} />
          </button>
          <button className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition">
            <FaFacebookF className="text-gray-300" size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
