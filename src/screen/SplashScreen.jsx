import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import TextType from "../components/animatedText/texttypes";
import { colors, colorsArr } from "../css/css";
import ShinyText from "../components/animatedText/shinytext";
import { Experience } from "../features/characters/hema/experience";

function getRandomColor() {
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
        const color = colorful ? getRandomColor() : undefined;
        return (
          <motion.span
            key={i}
            initial={{
              opacity: 0,
              y: 20,
              color: colorful ? "#4B5563" : undefined,
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
  const [gradientColors, setGradientColors] = useState(colorsArr[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * colorsArr.length);
      setGradientColors(colorsArr[randomIndex]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="splashScreen"
      initial={{
        background: `linear-gradient(to bottom, ${gradientColors.from}, ${gradientColors.to})`,
      }}
      animate={{
        background: `linear-gradient(to bottom, ${gradientColors.from}, ${gradientColors.to})`,
      }}
      transition={{ duration: 3, ease: "easeInOut" }}
    >
      {/* <div className="absolute top-6 left-6">
        <h1 className="text-3xl font-light italic text-black-800">
          Con<span className="font-normal not-italic">f</span>do
        </h1>
      </div> */}

      <div className="flex flex-col items-center pb-10">
        <div className="text-4xl md:text-5xl font-bold text-gray-800 ">
          <TextType
            text={["Say Hello to", " "]}
            typingSpeed={75}
            pauseDuration={1500}
            textColors={["#000"]}
          />{" "}
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
            <ShinyText
              text="Why you'll love it:"
              disabled={false}
              speed={3}
              className='custom-class'
            />

            <p className="text-gray-700 leading-relaxed">
              This is your space to talk about anything -no judgment, no
              pressure, Just real conversations with people who get it. Whether
              you're feeling shy, lonely, or just need someone to chat with,
              we're here to make it easy and comfortable
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
      <div style={{ width: "100%", height: "100vh" }}>
          <Experience/>
        </div>
    </motion.div>
  );
}

export default SplashScreen;
