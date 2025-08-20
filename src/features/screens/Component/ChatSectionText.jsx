import React, { useRef, useState, useEffect, useContext } from "react";
import SettingsVoiceRoundedIcon from '@mui/icons-material/SettingsVoiceRounded';
import CameraAltRoundedIcon from '@mui/icons-material/CameraAltRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';

// import aiAvatar from "../../../assets/avatar.svg";
import { inactiveMsgList } from "../../../data/data";
import { chatSession } from "../../../data/data";
import { formatMessage } from "./textFormatter";
import { greeting } from "../../../Service/greeting";
import { aiResponse } from "../../../Service/aiResponse";
import { AuthContext } from "../../../common/helper/AuthContext";
import { createVoiceUtterance } from "../../../utils/voiceUtils";
import { apiService } from "../../../Service/apiService";
import { POST_url } from "../../../connection/connection ";
import TypingDots from "./TypingDots.jsx";
import SessionExpiredModal from '../../../common/modal/SessionExpiredModal.jsx';


const ChatSectionText = ({
  isTerminated,
  setIsTerminated,
  setIsRecorderActive,
}) => {
  const { setAvatarSpeech } = useContext(AuthContext);
  const { selectedAvatar } = useContext(AuthContext);

  // const [session, setSession] = useState([chatSession[0]]);
  const [sessionController, setSessionController] = useState(0);
  const [showNewSessionBtn, setShowNewSessionBtn] = useState(false);
  const [isAILoading, setIsAILoading] = useState(false);
  const chatRef = useRef(null);
  const endOfChatRef = useRef(null);
  const sessionControllerRef = useRef(0); // persists value across re-renders
  const [userInput, setUserInput] = useState("");
  const userInputRef = useRef("");
  const inactivityTimer = useRef(null);
  const stageRef = useRef("language");
  // const [speakingText, setSpeakingText] = useState("");
  // const [avatarReading, setAvatarReading] = useState(false);
  const [isMicHovered, setIsMicHovered] = useState(false);
  const [isCameraHovered, setIsCameraHovered] = useState(false);
  const [isMicActive, setIsMicActive] = useState(false);
  const [session, setSession] = useState(chatSession);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const expiryTimer = useRef(null);




  const generateRandomID = () => {
    const id = Math.floor(1000 + Math.random() * 9000);
    setRandomID(id);
    setConversationStage("language");
    setSessionController(0);
    setCurrentIndex(0);
  };

  // When ChatScreen mounts, refresh from latest chatSession
  useEffect(() => {
    setSession(chatSession);
  }, []);

  useEffect(() => {
    if (isTerminated) {
      setShowNewSessionBtn(true);
    }
  }, [isTerminated]);

  useEffect(() => {
    return () => clearTimeout(expiryTimer.current);
  }, []);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [session, isAILoading]);

  // 2. Scroll to button when it appears
  useEffect(() => {
    if (showNewSessionBtn && endOfChatRef.current) {
      endOfChatRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [showNewSessionBtn]);

  //inactive message list printing
  const startInactivityTimer = () => {
    clearTimeout(inactivityTimer.current);

    if (sessionControllerRef.current >= inactiveMsgList.length) return;

    inactivityTimer.current = setTimeout(async () => {
      const index = sessionControllerRef.current;
      const prompt = inactiveMsgList[index];

      sessionControllerRef.current += 1;
      setSessionController(index + 1);

      await speakAndAdd(prompt);
    }, 30000); // or longer if needed
  };

  useEffect(() => {
    if (sessionController === inactiveMsgList.length) {
      clearTimeout(inactivityTimer.current);
      //setIsTerminated(true);
      setShowNewSessionBtn(true);
      //setIsRecorderActive(false);
    }
  }, [sessionController]);

  const sessionId = sessionStorage.getItem("sessionId");


  const handleUserMessage = async (text) => {
    if (!text) return;
    setIsMicActive(false);

    // Reset inactivity timers (if any)
    clearTimeout(inactivityTimer.current);
    sessionControllerRef.current = 0;
    setSessionController(0);

    // Add user message
    const userMsg = {
      role: "user",
      message: text,
      time: new Date().toLocaleTimeString(),
    };
    setSession((prev) => [...prev, userMsg]);
    setUserInput("");

    try {
      setIsAILoading(true);

      // Call backend chat API
      const payload = {
        session_id: sessionId,
        time: "5 min",
        user_input: text,
        avatar_id: 2
      };

      const res = await apiService({
        url: POST_url.chat,
        method: "POST",
        data: payload,
      });

      console.log("Chat API response:", res);

      // check if session ended
      if (res?.data?.end === true) {
        setShowSubscriptionModal(true); 
        return; 
      }


      // Add AI response to session
      if (res?.data?.message) {
        setSession((prev) => [
          ...prev,
          {
            role: "ai",
            message: res.data.message,
            time: new Date().toLocaleTimeString(),
          },
        ]);
        setAvatarSpeech(res.data.message);
      }
    } catch (err) {
      console.error("Chat API Error:", err);
      setSession((prev) => [
        ...prev,
        {
          role: "ai",
          message: "Oops! Something went wrong. Please try again.",
          time: new Date().toLocaleTimeString(),
        },
      ]);
    } finally {
      setIsAILoading(false);
    }
  };


  const speakAndAdd = async (message) => {


    setAvatarReading(true);

    return new Promise((resolve) => {
      setSpeakingText(message);

      setAvatarSpeech(message);
      const utter = new SpeechSynthesisUtterance(message);

      // Use avatar-specific voice configuration


      utter.onend = () => {
        startInactivityTimer();
        resolve();
        setAvatarReading(false);
      };


      setSession((prev) => [
        ...prev,
        { role: "ai", message, time: new Date().toLocaleTimeString() },
      ]);
    });
  };

  return (
    <div className='flex flex-col justify-between p-3 h-[100%]'>
      {/* Chat messages */}
      <div
        ref={chatRef}
        className="custom-scrollbar overflow-y-auto rounded-xl padding-top text-black max-w-[100%]"

      >
        {session.map((item, index) => (
          <React.Fragment key={index}>
            <div
              className={`mb-4 px-2 flex ${item.role === "ai" ? "items-start" : "justify-end"
                }`}
            >
              {item.role === "ai" ? (
                <div
                  className={`max-w-[60%] flex gap-3 px-4 py-2 rounded-t-3xl rounded-b-3xl text-sm ai-msg ${(formatMessage(item.message))
                    ? "items-center"
                    : "items-start"
                    }`}
                >
                  <div
                    className="flex"
                    onClick={(e) => handleMessageClick(e)}
                    dangerouslySetInnerHTML={{
                      __html: formatMessage(item.message),
                    }}
                  ></div>
                </div>
              ) : (
                // <div className="max-w-[40%] px-4 py-3 rounded-t-3xl rounded-b-3xl text-sm user-msg">
                //   {item.message}
                // </div>
                <div
                  className="max-w-[40%] px-4 py-3 rounded-t-3xl rounded-b-3xl text-sm user-msg opacity-70"
                  style={{ backgroundColor: selectedAvatar?.color
                  }}
                >
                  {item.message}
                </div>
              )}
            </div>

            {/* Typing loader for last AI message */}
            {isAILoading && index === session.length - 1 && (
              <div className="mb-4 px-2 flex items-start">
                <div className="max-w-[60%] px-4 py-2 rounded-t-3xl rounded-b-3xl text-sm ai-msg">

                  <TypingDots />

                </div>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* New session button */}
      {showNewSessionBtn && (
        <div className="flex justify-center" ref={endOfChatRef}>
          <button
            className="px-6 py-2 rounded-xl cursor-pointer transition duration-200"
            onClick={() => {
              setShowNewSessionBtn(false);
              //setIsTerminated(false);
              setSession([chatSession[0]]);
              generateRandomID();
              //setIsRecorderActive(true);
            }}
          >
            Do you want to start new session?
          </button>
        </div>
      )}
      <div className="text-input-section flex justify-between items-center mt-4 gap-4 w-full">
        <div className="input-text-box flex flex-1 items-center px-3 py-2 rounded-2xl input-text-box">
          <input
            type="text"
            value={userInput}
            onChange={(e) => {
              setUserInput(e.target.value);
              userInputRef.current = e.target.value;
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleUserMessage(userInputRef.current);
                setUserInput("");
                userInputRef.current = "";
              }
            }}
            className="flex-1 rounded-2xl h-[2.6rem] outline-none placeholder:font-medium"
            placeholder="Type here" />
          <div className='buttons flex gap-2'>
            <button
              className={`${isMicActive ? "mic-active" : ""} ${isMicHovered ? "input-icon-hover" : "input-icon"
                } rounded-full w-[2.3rem] h-[2.3rem] cursor-pointer flex items-center justify-center transition-colors duration-200`}
              onClick={() => setIsMicActive(prev => !prev)}
              onMouseEnter={() => setIsMicHovered(true)}
              onMouseLeave={() => setIsMicHovered(false)}
            >
              <SettingsVoiceRoundedIcon />
            </button>
            <button
              className={`${isCameraHovered ? "input-icon-hover" : "input-icon"
                } rounded-full w-[2.3rem] h-[2.3rem] cursor-pointer flex items-center justify-center transition-colors duration-200`}
              onMouseEnter={() => setIsCameraHovered(true)}
              onMouseLeave={() => setIsCameraHovered(false)}
            >
              <CameraAltRoundedIcon />
            </button>
          </div>
        </div>
        <button disabled={isTerminated}
          onClick={() => {
            handleUserMessage(userInputRef.current);
            setUserInput("");
            userInputRef.current = "";
          }}
          className="send-icon w-[3.5rem] h-[3.5rem] rounded-2xl cursor-pointer flex items-center justify-center pl-1">

          <SendRoundedIcon fontSize='large' />
        </button>
      </div>
      {/* ✅ sessionExpired Modal */}
      {showSubscriptionModal && (
        <SessionExpiredModal onClose={() => setShowSubscriptionModal(false)} />
      )}
    </div>
  );
};

export default ChatSectionText;
