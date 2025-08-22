import React, { useContext, useEffect, useState, useRef, useLayoutEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaGoogle, FaFacebookF, FaCheckCircle } from "react-icons/fa";
import { auth, googleProvider, facebookProvider } from "../../firebaseConfig.js";
import { signInWithPopup, getAdditionalUserInfo } from "firebase/auth";
import { POST_url } from "../../connection/connection .jsx";
import { apiService } from "../../Service/apiService.jsx";
import ChooseAvatar from "../../components/select_avatar.jsx";
import { SubhoExperience } from "../../features/characters/subho/subhoExperience.jsx";
import { Experience } from "../../features/characters/hema/experience.jsx";
import { SitaExperience } from "../../features/characters/sita/sitaExperience.jsx";
import { RaviExperience } from "../../features/characters/ravi/raviExperience.jsx";
import { AuthContext } from "../../common/helper/AuthContext.jsx";

export default function LoginModal() {

    const location = useLocation();
    const { selectedAvatar, setOpenLoginModal, setIsLogin } = useContext(AuthContext)
    const [isClosing, setIsClosing] = useState(false);

    console.log(selectedAvatar)

    const avatar = location.state?.avatar || {
        name: "Default",
        img: "https://via.placeholder.com/150",
    };

    const [email, setEmail] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [loginSuccess, setLoginSuccess] = useState(false);
    const handleGoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const userEmail = result.user.email;
            const userName = result.user.displayName;
            const loginType = "google";

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

                sessionStorage.setItem("user", JSON.stringify(userData));

                if (data.statusCode === 201) {
                    console.log("First-time login:", data.message);
                } else if (data.statusCode === 200) {
                    console.log("Returning user:", data.message);
                }

                // setRedirectToChat(true)
                setLoginSuccess(true);
                setIsLogin(true); // Signal login state change to update Header

                // Show success message, then close the modal after a delay
                setTimeout(() => {
                    handleClose();
                }, 1300);
            } else {
                console.error("Login failed:", data.message);
                alert("Login failed: " + data.message);
            }
        } catch (error) {
            console.error("Google Sign-In Error:", error);
            alert("Google login failed. Please try again.");
        }
    };

    const handleFacebookLogin = async () => {
        try {
            const result = await signInWithPopup(auth, facebookProvider);
            const info = getAdditionalUserInfo(result);
            const userEmail = "null";
            const userName = result.user.displayName || info?.profile?.name || "User";
            const loginType = "facebook";

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

                sessionStorage.setItem("user", JSON.stringify(userData));

                if (data.statusCode === 201) {
                    console.log("First-time login:", data.message);
                } else if (data.statusCode === 200) {
                    console.log("Returning user:", data.message);
                }
                // setRedirectToChat(true)
                setLoginSuccess(true);
                setIsLogin(true); // Signal login state change to update Header

                // Show success message, then close the modal after a delay
                setTimeout(() => {
                    handleClose();
                }, 1300);
            } else {
                console.error("Login failed:", data.message);
                alert("Login failed: " + data.message);
            }
        } catch (error) {
            console.error("Facebook Sign-In Error:", error);
        }
    };

    useEffect(() => {
        const storedEmail = sessionStorage.getItem("email");
        const storedName = sessionStorage.getItem("displayName");
        if (storedEmail) {
            setEmail(storedEmail);
            if (storedName) setDisplayName(storedName);

        }
    }, []);
    const socialButtonStyle = {
        backgroundColor: "rgba(217, 217, 217, 1)",
        opacity: "0.5",
        borderRadius: "50%",
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
        e.currentTarget.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.08)";
        const icon = e.currentTarget.querySelector("svg");
        if (icon) icon.style.opacity = "0.5";
    };

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            setOpenLoginModal(false);
        }, 300);
    };

    const renderAvatar = () => {
        switch (selectedAvatar) {
            case "Subho":
                return <SubhoExperience disableWave />;
            case "Sita":
                return <SitaExperience disableWave />
            case "Ravi":
                return <RaviExperience disableWave />
            case "Hema":
                return <Experience disableWave />
            default:
                return (
                    <RaviExperience disableWave />
                );
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-lg z-5">
            <div className={`loginModal rounded-2xl p-3 h-[46%] w-[22%] flex flex-col items-center justify-center ${isClosing ? 'animate-zoom-out' : 'animate-zoom-in'}`}>
                <div className="flex flex-row items-start justify-between h-1/10 w-[100%]">
                    <div></div>
                    <button onClick={handleClose} className="modalCloseIcon rounded-full w-4 h-4 cursor-pointer"></button>
                </div>
                <div className="flex flex-col items-center justify-center h-9/10 pb-[10%]">
                    <div className="avatar-container w-28 h-28 md:w-32 md:h-32 rounded-full border-2 border-gray-500 overflow-hidden shadow-md">
                        {renderAvatar()}
                    </div>
                    {loginSuccess ? (
                        <>
                            <FaCheckCircle className="text-4xl mt-6 mb-2" style={{ color: "#B3FF00" }} />
                            <p className="text-base font-extrabold">Login successfully</p>
                        </>
                    ) : (
                        <><p className="text-base font-extrabold py-4">Login here</p>
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
                                            transition: "color 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                                            opacity: "0.5",
                                        }}
                                    />
                                </button>
                                <button
                                    onClick={handleFacebookLogin}
                                    style={socialButtonStyle}
                                    onMouseEnter={handleMouseEnter}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    <FaFacebookF
                                        style={{
                                            color: "rgb(107, 114, 128)",
                                            fontSize: "20px",
                                            pointerEvents: "none",
                                            transition: "color 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                                            opacity: "0.5",
                                        }}
                                    />
                                </button>
                            </div></>
                    )}
                </div>
            </div>
        </div>
    );
}
