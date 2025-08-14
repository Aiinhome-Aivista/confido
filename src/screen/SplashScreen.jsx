import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Experience } from "../features/characters/hema/experience";
import Header from "../components/header";

function SplashScreen() {
  const [wordAnimationStarted, setWordAnimationStarted] = React.useState(false);
  //const colors = ["#76DE48", "#FF6B6B", "#FFD93D", "#6BCB77", "#4D96FF", "#FF7B54"];
  const colors = ["#797979"];
  const words = ["Great", "Super", "Prime", "Elite", "Topaz", "Happy"];
  const [wordIndex, setWordIndex] = React.useState(0);
  const [headlineVisible, setHeadlineVisible] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => setHeadlineVisible(true), 700);
    let interval;
    setTimeout(() => {
      setWordAnimationStarted(true);
      interval = setInterval(() => {
        setWordIndex((prev) => (prev + 1) % words.length);
      }, 1800);
    }, 1400);
    return () => clearInterval(interval);
  }, []);

  const requestMicrophonePermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      console.log("Microphone access granted:", stream);
      // You can now start conversation logic here
    } catch (err) {
      console.error("Microphone access denied:", err);
      alert("Please allow microphone access to start the conversation.");
    }
  };

  return (
    <div>
      <Header />
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        <div className="w-full min-h-screen flex flex-col items-center justify-start font-nunito text-black pt-20 z-2">
          <motion.h1
            className="font-extrabold text-5xl md:text-6xl text-center mb-2 leading-tight justify-center"
            initial={{ opacity: 0, y: -40 }}
            animate={headlineVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="text-black align-middle leading-[3.5rem] justify-center ml-20">
              Say Hello to{" "}
            </span>
            <span className="inline-block align-middle relative overflow-hidden px-2 min-w-[8ch] h-[4.5rem] md:h-[4.75rem]">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={wordIndex}
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{
                    y: "0%",
                    opacity: 1,
                    color:
                      !wordAnimationStarted
                        ? "#000"
                        : colors[wordIndex % colors.length],
                    transition: {
                      y: { duration: 0.4, ease: "easeOut" },
                      opacity: { duration: 0.4, ease: "easeOut" },
                      color: { duration: 0.3, ease: "easeIn" },
                    },
                  }}
                  exit={{
                    y: "-100%",
                    opacity: 0,
                    transition: {
                      y: { duration: 0.4, ease: "easeIn", delay: 0.5 },
                      opacity: { duration: 0.4, ease: "easeIn", delay: 0.5 },
                      color: { duration: 0.3, ease: "easeIn" },
                    },
                  }}
                  className="absolute left-0 top-0 w-full text-left leading-[4.5rem] font-extrabold"
                >
                  {words[wordIndex]}
                </motion.span>
              </AnimatePresence>
            </span>
            <br />
            Conversation.
          </motion.h1>

          <p className="font-normal text-lg text-center mb-6">
            Overcome shyness with a simple hello.
          </p>
          <div className="font-semibold text-lg text-center mb-2">
            Why you’ll love it:
          </div>
          <p className="font-normal text-base text-center max-w-xl mb-8">
            This is your space to talk about anything - no judgment, no pressure,
            just real conversations with people who get it. Whether you’re feeling
            shy, lonely, or just need someone to chat with, we’re here to make it
            easy and comfortable.
          </p>

          <button
            className="px-8 py-3 rounded-full bg-gray-200 text-black font-bold text-lg border-none cursor-pointer mb-8 shadow"
            onClick={requestMicrophonePermission}
          >
            Start conversation
          </button>

          <div
            style={{
              position: "absolute",
              bottom: "0",
              left: "50%",
              transform: "translateX(-50%)",
              width: "100%",
              height: "60vh",
              zIndex: 2,
              overflow: "visible",
              pointerEvents: "auto",
            }}
          >
            <Experience />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SplashScreen;
