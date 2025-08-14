import React from "react";
import { motion } from "framer-motion";
import confidoSvg from "../assets/icons/confido_logo.svg";
import { Experience } from "../features/characters/hema/experience";
import Header from "../components/header";

function SplashScreen() {
  const blobs = [
    { size: "400px", top: "10%", left: "5%", duration: 8, delay: 0 },
    { size: "350px", top: "40%", left: "60%", duration: 10, delay: 2 },
    { size: "450px", top: "70%", left: "30%", duration: 12, delay: 4 },
  ];
  // Animated words for 'Great'
  const words = ["Great", "Super", "Prime", "Elite", "Topaz", "Happy"];
  const [wordIndex, setWordIndex] = React.useState(0);
  const [headlineVisible, setHeadlineVisible] = React.useState(false);
  React.useEffect(() => {
    // Animate headline in first, then start word animation
    setTimeout(() => setHeadlineVisible(true), 700);
    let interval;
    setTimeout(() => {
      interval = setInterval(() => {
        setWordIndex((prev) => (prev + 1) % words.length);
      }, 1800);
    }, 1400);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <Header />
    
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        //backgroundColor: "#FFFFFF",
        overflow: "hidden",
       
      }}
    >
     

      
      <div className="w-full min-h-screen flex flex-col items-center justify-start text-black pt-20 z-2">
        <motion.h1
          className="font-extrabold text-5xl md:text-6xl text-center mb-2 leading-tight"
          initial={{ opacity: 0, y: -40 }}
          animate={headlineVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Say Hello to{" "}
          <motion.span
            key={wordIndex}
            initial={{ y: wordIndex % 2 === 0 ? -60 : 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: wordIndex % 2 === 0 ? 60 : -60, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={{ color: "#000", display: "inline-block", margin: "0 8px" }}
          >
            {words[wordIndex]}
          </motion.span>
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
          This is your space to talk about anything - no judgment, not pressure,
          Just real conversations with people who get it. Whether you’re feeling
          shy, lonely, or just need someone to chat with, we’re here to make it
          easy and confortable.
        </p>
        <button className="px-8 py-3 rounded-full bg-gray-200 text-black font-bold text-lg border-none cursor-pointer mb-8 shadow">
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