import React, { useContext } from "react";
import { AuthContext } from "../common/helper/AuthContext.jsx";

const TerminateModal = ({ onClose }) => {
    const { setSessionTerminated, setIsLoggedIn } = useContext(AuthContext);

    const handleConfirm = () => {
        setIsLoggedIn(false);
        // Clear sessionId
        sessionStorage.removeItem("sessionId");
        console.log("Session cleared");
        setSessionTerminated(true);
        onClose();
    };



    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center terminate-bg">
            <div className="loginModal rounded-2xl p-6 w-[90%] max-w-sm relative text-center backdrop-blur-lg bg-blend-overlay border border-white/20 shadow-md">
                {/* Top bar with red dot as close trigger */}
                <div className="absolute top-0 left-0 w-full h-9 ai-bg rounded-t-3xl flex items-center justify-end px-3 gap-2">
                    {/* Clickable Red Dot (acts as close) */}
                    <div
                        onClick={onClose}
                        className="w-4 h-4 rounded-full modalCloseIcon cursor-pointer hover:scale-110 transition-transform"
                        aria-label="Close"
                        title="Close"
                    ></div>
                </div>

                <div className="mt-16 username font-semibold text-sm mb-6">
                    Do you really want to<br />close the session?
                </div>

                {/* Buttons */}
                <div className="flex justify-center gap-3 mb-12">
                    <button
                        onClick={handleConfirm}
                        className="user-msg text-xs font-normal px-4 py-1 rounded-full cursor-pointer transition-transform duration-200 hover:scale-105"
                    >
                        Yes
                    </button>
                    <button
                        onClick={onClose}
                        className="user-msg text-xs font-normal px-4 py-1 rounded-full cursor-pointer transition-transform duration-200 hover:scale-105"
                    >
                        No
                    </button>
                </div>


            </div>
        </div >
    );
};

export default TerminateModal;
