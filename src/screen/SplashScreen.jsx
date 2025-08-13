import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import TextType from "../components/animatedText/texttypes";
import ShinyText from "../components/animatedText/shinytext";
import confidoSvg from "../assets/icons/confido_logo.svg";
import styles from "../css/css.module.css";
const greatWords = [
  "Great",
  "Awesome",
  "Superb",
  "Amazing",
  "Fantastic",
  "Brilliant",
  "Wonderful",
  "Incredible",
  "Spectacular",
  "Marvelous",
];

function AnimatedSplitText({
  text,
  split = "words",
  delay = 0,
  duration = 0.5,
  staggerDelay = 0.2,
  className = "",
  color = undefined,
}) {
  const items = split === "words" ? text.split(" ") : text.split("");

  return (
    <span className={className}>
      {items.map((item, i) => (
        <motion.span
          key={i}
          initial={{
            opacity: 0,
            y: 20,
            color: color ? color : undefined,
          }}
          animate={{
            opacity: 1,
            y: 0,
            color: color ? color : undefined,
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
      ))}
    </span>
  );
}

function SplashScreen() {
  const [currentGreatIndex, setCurrentGreatIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentGreatIndex((prevIndex) => {
        let nextIndex;
        do {
          nextIndex = Math.floor(Math.random() * greatWords.length);
        } while (nextIndex === prevIndex && greatWords.length > 1);
        return nextIndex;
      });
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center w-screen h-screen text-center px-6 bg-white">
     <div>
        <img
          src={confidoSvg}
          alt="Confido Logo"
          className={styles.confidoLogo}
        />
      </div>
      <div className="flex flex-col items-center pb-50">
       <div className={styles.splashMainText}>
        <TextType
          text={[`Say Hello to ${greatWords[currentGreatIndex]} Conversation.`]}
          typingSpeed={20}
          pauseDuration={2500}
          textColors={["#1E1E1E"]}
          key={greatWords[currentGreatIndex]}
        />
      </div>

        <div className="flex flex-col items-center max-w-2xl mt-6">
          <AnimatedSplitText
            text="Overcome shyness with a simple hello"
            split="words"
            delay={1.5}
            duration={500}
            staggerDelay={0.15}
            color="#1E1E1E"
          />

          <div className={styles.whyLoveText}>
            <ShinyText
              text="Why you'll love it:"
              disabled={false}
              speed={3}
              className="custom-class"
            />
  </div>
  <div className={styles.splashContentText}>
            <p >
              This is your space to talk about anything -no judgment, not
              pressure, Just real conversations with people who get it. Whether
              you’re feeling shy, lonely, or just need someone to chat with,
              we’re here to make it easy and comfortable.
            </p>

        </div>
          <button
            onClick={() => alert("Start Conversation Clicked!")}
            className={styles.splashButton}
          >
            Start conversation
          </button>
        </div>
      </div>
    </div>
  );
}

export default SplashScreen;
