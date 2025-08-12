import React from "react";
import { motion } from "framer-motion";

function AnimatedSplitText({
  text,
  split = "words",
  delay = 0,
  duration = 0.5,
  staggerDelay = 0.2,
  className = "",
}) {
  const items = split === "words" ? text.split(" ") : text.split("");

  return (
    <span className={className}>
      {items.map((item, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: delay + i * staggerDelay,
            duration: duration / 1000, // converting ms to seconds
          }}
          style={{
            display: "inline-block",
            marginRight: split === "words" ? "0.25em" : 0,
          }}
        >
          {item}
        </motion.span>
      ))}
    </span>
  );
}

function SplashScreen() {
  return (
    <div className="relative flex flex-col items-center justify-center w-screen h-screen bg-gradient-to-b from-gray-50 to-green-50 text-center px-6">
      {/* Logo */}
      <div className="absolute top-6 left-6">
        <h1 className="text-2xl font-light italic">
          Con<span className="font-normal not-italic">f</span>ido
        </h1>
      </div>

     
      <AnimatedSplitText
        text="Say Hello to Great"
        split="words"
        delay={0}
        duration={500}
        staggerDelay={0.2}
        className="text-4xl md:text-5xl font-bold"
      />
     
      <AnimatedSplitText
        text="Conversation."
        split="words"
        delay={0}
        duration={500}
        staggerDelay={0.2}
        className="text-4xl md:text-5xl font-bold"
      />
       
     <br />
     
      <div className="flex flex-col items-center max-w-2xl">
        <AnimatedSplitText
          text="Overcome shyness with a simple hello."
          split="words"
          delay={0.5}
          duration={500}
          staggerDelay={0.15}
          className="mt-3 text-gray-600 text-lg"
        />

       
        <div className="mt-6">
          <h2 className="font-semibold mb-2 text-lg">Why you’ll love it:</h2>
          <p className="text-gray-700 leading-relaxed">
            This is your space to talk about anything – no judgment, no
            pressure, just real conversations with people who get it. Whether
            you’re feeling shy, lonely, or just need someone to chat with, we’re
            here to make it easy and comfortable.
          </p>
        </div>

        <button
          onClick={() => alert("Start Conversation Clicked!")}
          className="mt-6 px-6 py-3 text-black rounded-lg shadow-md transition-colors bg-white hover:bg-gray-100"
        >
          Start Conversation
        </button>

        <div className="mt-8">
          <img
            src="https://via.placeholder.com/150"
            alt="avatar"
            className="w-40 h-40 rounded-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export default SplashScreen; 