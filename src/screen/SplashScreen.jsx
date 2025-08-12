import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

// Utility to get a random color from a palette
function getRandomColor() {
  const colors = [
    "#F87171", // red-400
    "#FBBF24", // yellow-400
    "#34D399", // green-400
    "#60A5FA", // blue-400
    "#A78BFA", // purple-400
    "#F472B6", // pink-400
    "#38BDF8", // sky-400
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

function AnimatedSplitText({
  text,
  split = "words",
  delay = 0,
  duration = 0.5,
  staggerDelay = 0.2,
  className = "",
  colorful = false,
}) {
  const items = split === "words" ? text.split(" ") : text.split("");

  return (
    <span className={className}>
      {items.map((item, i) => {
        // Only apply random color if colorful is true
        const color = colorful ? getRandomColor() : undefined;
        return (
          <motion.span
            key={i}
            initial={{
              opacity: 0,
              y: 20,
              color: colorful ? "#4B5563" : undefined, // gray-600
            }}
            animate={{
              opacity: 1,
              y: 0,
              color: colorful ? color : undefined,
            }}
            transition={{
              delay: delay + i * staggerDelay,
              duration: duration / 1000,
            }}
            style={{
              display: "inline-block",
              marginRight: split === "words" ? "0.25em" : 0,
            }}
          >
            {item}
          </motion.span>
        );
      })}
    </span>
  );
}

function SplashScreen() {
  const [gradientColors, setGradientColors] = useState({
    from: "#e5e7eb", // gray-200
    to: "#d1fae5"    // green-200
  });

  useEffect(() => {
    const colors = [
      { from: "#e5e7eb", to: "#d1fae5" }, // gray-200 to green-200
      { from: "#e0f2fe", to: "#d1fae5" }, // blue-200 to green-200
      { from: "#e5e7eb", to: "#e0f2fe" }, // gray-200 to blue-200
      { from: "#fee2e2", to: "#d1fae5" }, // red-200 to green-200
      { from: "#e5e7eb", to: "#fee2e2" }, // gray-200 to red-200
    ];

    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * colors.length);
      setGradientColors(colors[randomIndex]);
    }, 8000); // Change every 8 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      className="relative flex flex-col items-center justify-center w-screen h-screen text-center px-6"
      initial={{ background: `linear-gradient(to bottom, ${gradientColors.from}, ${gradientColors.to})` }}
      animate={{ background: `linear-gradient(to bottom, ${gradientColors.from}, ${gradientColors.to})` }}
      transition={{ duration: 3, ease: "easeInOut" }}
    >
      {/* Logo - made more visible with darker color and larger size */}
      <div className="absolute top-6 left-6">
        <h1 className="text-3xl font-light italic text-gray-800">
          Con<span className="font-normal not-italic">f</span>do
        </h1>
      </div>

      <div className="flex flex-col items-center pt-0.5">
        <div className="text-4xl md:text-5xl font-bold text-gray-800">
          <AnimatedSplitText
            text="Say Hello to"
            split="words"
            delay={0}
            duration={500}
            staggerDelay={0.2}
            className="inline-block"
          />
          {' '}
          <AnimatedSplitText
            text="Great"
            split="letters"
            delay={0.6}
            duration={500}
            staggerDelay={0.15}
            className="inline-block"
            colorful={true}
          />
        </div>
        
        <div className="text-4xl md:text-5xl font-bold text-gray-800 mt-0.5">
          <AnimatedSplitText
            text="Conversation."
            split="words"
            delay={1.2}
            duration={500}
            staggerDelay={0.2}
            className="inline-block"
          />
        </div>

        <div className="flex flex-col items-center max-w-2xl mt-6">
          <AnimatedSplitText
            text="Overcome shyness with a simple hello"
            split="words"
            delay={1.5}
            duration={500}
            staggerDelay={0.15}
            className="text-gray-600 text-lg"
          />

          <div className="mt-8">
            <h2 className="font-semibold mb-2 text-lg text-gray-800">Why you'll love it:</h2>
            <p className="text-gray-700 leading-relaxed">
              This is your space to talk about anything -no judgment, no pressure, Just real
              conversations with people who get it. Whether you're feeling shy, lonely, or just need
              someone to chat with, we're here to make it easy and comfortable
            </p>
          </div>

          <button
            onClick={() => alert("Start Conversation Clicked!")}
            className="mt-8 px-8 py-3 bg-gray-800 text-white rounded-lg shadow-md transition-colors hover:bg-gray-700"
          >
            Start conversation
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default SplashScreen;