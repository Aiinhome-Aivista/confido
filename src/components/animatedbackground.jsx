import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import colors from "../css/css";

export default function AnimatedBackground({ children }) {
  const controls = useAnimation();

  useEffect(() => {
    const animateRandom = () => {
      controls.start({
        x: `${Math.random() * 100 - 50}%`, // -50% to 50%
        y: `${Math.random() * 100 - 50}%`,
        transition: {
          duration: 6 + Math.random() * 4, // 6–10 seconds
          ease: "easeInOut",
          onComplete: animateRandom, // loop but random each time
        },
      });
    };

    animateRandom();
  }, [controls]);

  return (
    <div
      className="relative overflow-hidden w-full h-full"
      style={{ backgroundColor: colors.background }}
    >
      {/* Random Moving Green Glow */}
      <motion.div
        className="absolute w-[70%] h-[70%] rounded-full blur-[150px]"
        style={{
          background: `radial-gradient(circle, ${colors.greenGlow}, transparent)`,
        }}
        animate={controls}
      />

      {/* Foreground Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
