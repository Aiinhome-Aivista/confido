import React, { useRef, useState, useEffect } from "react";

// import aiAvatar from "../../../assets/avatar.svg";
import { inactiveMsgList } from "../../../data/data";
import { chatSession } from "../../../data/data";
import { formatMessage } from "./textFormatter";
import { greeting } from "../../../Service/greeting";
import { aiResponse } from "../../../Service/aiResponse";

// Helper: check if single-line message
const isSingleLine = (html) => {
    return !/<br\s*\/?>|\n/.test(html);
};

const ChatSectionText = ({
    isTerminated,
    setIsTerminated,
    chatStarted,
    setChatStarted,
    setIsRecorderActive,
}) => {

    const [session, setSession] = useState([chatSession[0]]);
    const [sessionController, setSessionController] = useState(0);
    const [showNewSessionBtn, setShowNewSessionBtn] = useState(false);
    const [isAILoading, setIsAILoading] = useState(false);

    const chatRef = useRef(null);
    const endOfChatRef = useRef(null);
    const sessionControllerRef = useRef(0); // persists value across re-renders



    const generateRandomID = () => {
        const id = Math.floor(1000 + Math.random() * 9000);
        setRandomID(id);
        setConversationStage("language");
        setSessionController(0);
        setCurrentIndex(0);
    };

    useEffect(() => {
        if (isTerminated) {
            setShowNewSessionBtn(true);
        }
    }, [isTerminated]);

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
            setIsTerminated(true);
            setShowNewSessionBtn(true);
            setIsRecorderActive(false);
        }
    }, [sessionController]);

    const handleUserMessage = async (text) => {
        if (!text) return;

        // RESET timeout state on user input
        clearTimeout(inactivityTimer.current);
        sessionControllerRef.current = 0;
        setSessionController(0);

        clearTimeout(inactivityTimer.current);
        const userMsg = {
            role: "user",
            message: text,
            time: new Date().toLocaleTimeString(),
        };

        setSession((prev) => [...prev, userMsg]);
        console.log("session", session);

        setUserInput("");

        // Stage 1: Language selection
        if (stageRef.current === "language") {
            let message = "";
            let validLang = false;

            if (text.toLowerCase().includes("english")) {
                message =
                    "Great! Let's continue in English. Thank you for your response. Please share your name & email to continue.";
                validLang = true;
            } else if (text.toLowerCase().includes("বাংলা")) {
                message =
                    "চমৎকার! চলুন বাংলায় চালিয়ে যাই। অনুগ্রহ করে আপনার নাম এবং ইমেল দিন।";
                validLang = true;
            } else if (
                text.toLowerCase().includes("hindi") ||
                text.toLowerCase().includes("हिंदी")
            ) {
                message = "बहुत बढ़िया! कृपया अपना नाम और ईमेल साझा करें।";
                validLang = true;
            } else {
                message =
                    "Language not recognized. Please respond with English, বাংলা (Bangla), or हिंदी (Hindi).";
            }

            await speakAndAdd(message);

            if (validLang) {
                setLanguage(text.toLowerCase());
                setConversationStage("awaitingDetails");
                stageRef.current = "awaitingDetails";
            }
        }

        // Stage 2: Awaiting name and email
        else if (stageRef.current === "awaitingDetails") {
            const nameMatch = text.match(/(?:my name is|i am)\s+([a-z\s]+)/i);
            const emailMatch = text.match(
                /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/
            );

            if (nameMatch && emailMatch) {
                const extractedName = nameMatch[1].trim();
                const extractedEmail = emailMatch[0].trim();

                setUserName(extractedName);
                setUserEmail(extractedEmail);

                const response = await greeting({ text: text });
                setGreetingText(response);
                console.log("greeting API response", response);

                await speakAndAdd(
                    `Thank you, ${extractedName}. You're all set to proceed!`
                );

                if (response.summary === "User not found in Users table") {
                    await speakAndAdd(
                        "Please include both your name and a valid email correctly to continue."
                    );
                } else {
                    setIsAILoading(true);
                    await new Promise((res) => setTimeout(res, 1500));
                    console.log("greetingText", greetingText);
                    await speakAndAdd(response.summary);

                    const jsonObject = {
                        companies: response.companies,
                        email: response.email,
                        first_name: response.first_name,
                        id: random4DigitID,
                        question: response.summary,
                    };

                    const aiResponseText = await aiResponse(jsonObject);

                    greetingTextRef.current = jsonObject;
                    setIsAILoading(false);
                    await speakAndAdd(aiResponseText.summary);

                    setConversationStage("chat");
                    stageRef.current = "chat";
                }

                // ✅ Set chat stage
            } else {
                await speakAndAdd(
                    "Please include both your name and a valid email to continue."
                );
            }
        }

        // Stage 3: Chat continues in loop
        else if (stageRef.current === "chat") {
            setIsAILoading(true);
            await new Promise((res) => setTimeout(res, 1500));
            console.log("greetingTextRef", greetingTextRef.current);
            const jsonObject = {
                companies: greetingTextRef.current.companies,
                email: greetingTextRef.current.email,
                first_name: greetingTextRef.current.first_name,
                id: greetingTextRef.current.id,
                chat_history: session,
                question: text,
            };
            const aiRes = await aiResponse(jsonObject);
            setIsAILoading(false);
            await speakAndAdd(aiRes.summary);
        }
    };


    return (
        <div className="curved-tops h-[18rem]">
            {/* Chat messages */}
            <div
                ref={chatRef}
                className="overflow-y-auto custom-scrollbar dashboard-bg h-[22rem] padding-top"
            >
                {session.map((item, index) => (
                    <React.Fragment key={index}>
                        <div
                            className={`mb-4 flex ${item.role === "ai" ? "items-start" : "justify-end"
                                }`}
                        >
                            {item.role === "ai" ? (
                                <div
                                    className={`max-w-[60%] flex gap-3 px-4 py-3 rounded-t-3xl rounded-b-3xl text-xs ai-bg username ${isSingleLine(formatMessage(item.message))
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
                                <div className="max-w-[60%] px-4 py-3 rounded-t-3xl rounded-b-3xl text-xs userbg username">
                                    {item.message}
                                </div>
                            )}
                        </div>

                        {/* Typing loader for last AI message */}
                        {isAILoading && index === session.length - 1 && (
                            <div className="mb-4 flex items-start">
                                <div className="max-w-[60%] flex items-start gap-3 px-4 py-3 rounded-t-3xl rounded-b-3xl text-xs ai-bg username animate-pulse">
                                    <img
                                        src={aiAvatar}
                                        alt="AI"
                                        className="w-7 h-7 ai-img rounded-full z-10 opacity-70"
                                    />
                                    <div className="text-[#ccc] italic">Typing...</div>
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
                        className="chatlist-bg text-gray-400 px-6 py-2 rounded-xl cursor-pointer hover:text-white transition duration-200"
                        onClick={() => {
                            setShowNewSessionBtn(false);
                            setIsTerminated(false);
                            setSession([chatSession[0]]);
                            generateRandomID();
                            setIsRecorderActive(true);
                        }}
                    >
                        Do you want to start new session?
                    </button>
                </div>
            )}
        </div>
    );
};

export default ChatSectionText;
