import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaGoogle, FaFacebookF } from "react-icons/fa";
import { auth, googleProvider } from "../firebaseConfig"; // adjusted path
import { signInWithPopup } from "firebase/auth";
import Header from "./header";
import { POST_url } from "../connection/connection ";
import { apiService } from "../Service/apiService";
import ChatScreen from "../features/screens/ChatScreen.jsx";
import { SubhoExperience } from "../features/characters/subho/subhoExperience.jsx";
import { Experience } from "../features/characters/hema/experience.jsx";
import { SitaExperience } from "../features/characters/sita/sitaExperience.jsx";
import { RaviExperience } from "../features/characters/ravi/raviExperience.jsx";
import { AuthContext } from "../common/helper/AuthContext.jsx";

export default function Login() {
  const location = useLocation();
  const [redirectToChat, setRedirectToChat] = useState(false)
  const { selectedAvatar } = useContext(AuthContext)
  console.log(selectedAvatar)

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

        setRedirectToChat(true)
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
  const socialButtonStyle = {
    borderRadius: "50%",
    //backgroundColor: "rgb(243, 244, 246)",
    transform: "scale(1)",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
    willChange: "transform, background-color, box-shadow",
    transition: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
    position: "relative",
    overflow: "hidden",
    width: "48px",
    height: "48px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "none",
    cursor: "pointer",
  };

  const handleMouseEnter = (e) => {
    e.currentTarget.style.transform = "scale(1.1)";
    e.currentTarget.style.backgroundColor = "rgb(229, 231, 235)";
    e.currentTarget.style.boxShadow = "0 8px 25px rgba(0, 0, 0, 0.12)";
    const icon = e.currentTarget.querySelector("svg");
    if (icon) icon.style.opacity = "1";

    const pulse = document.createElement("div");
    pulse.style.cssText = `
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.2);
    transform: translate(-50%, -50%) scale(0);
    animation: pulse 0.6s ease-out;
    pointer-events: none;
  `;
    e.currentTarget.appendChild(pulse);
    setTimeout(() => pulse.remove(), 600);
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.transform = "scale(1)";
    e.currentTarget.style.backgroundColor = "rgb(243, 244, 246)";
    e.currentTarget.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.08)";
    const icon = e.currentTarget.querySelector("svg");
    if (icon) icon.style.opacity = "0.5";
  };

  if (redirectToChat) {
    return <ChatScreen />;
  }

  const renderAvatar = () => {
    switch (selectedAvatar) {
      case "Subho":
        return <SubhoExperience />;
      case "Sita":
        return <SitaExperience />
      case "Ravi":
        return <RaviExperience />
      case "Hema":
        return <Experience />
      default:
        return (
          <Experience />
        );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-[100%] pb-[calc(20vh)]">
      <div className="w-28 h-28 md:w-32 md:h-32 rounded-full border border-gray-300 overflow-hidden shadow-md">
        {renderAvatar()}
      </div>
      <p className="text-base font-extrabold py-[calc(1vh)]">
        Login here
      </p>

      {/* Social buttons */}
      {/* Social buttons */}
      <div className="flex space-x-8">
        <button
          style={socialButtonStyle}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleGoogleLogin}
        >
          <FaGoogle
            style={{
              color: "rgb(107, 114, 128)",
              fontSize: "20px",
              pointerEvents: "none",
              willChange: "color",
              transition: "color 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
              opacity: "0.5"
            }}
          />
        </button>
        <button
          style={socialButtonStyle}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <FaFacebookF
            style={{
              color: "rgb(107, 114, 128)",
              fontSize: "20px",
              pointerEvents: "none",
              willChange: "color",
              transition: "color 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
              opacity: "0.5"
            }}
          />
        </button>
      </div>


      {/* Show logged-in email */}
      {/* {email && (
          <p className="text-sm text-gray-600 mt-2">
            Signed in as <strong>{email}</strong>
          </p>
        )} */}
    </div>
  );
}
