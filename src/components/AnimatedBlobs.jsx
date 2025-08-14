import React from "react";
import { motion } from "framer-motion";

const blobs = [
  { size: "400px", top: "10%", left: "5%", duration: 8, delay: 0 },
  { size: "350px", top: "40%", left: "60%", duration: 10, delay: 2 },
  { size: "450px", top: "70%", left: "30%", duration: 12, delay: 4 },
];

function AnimatedBlobs() {
  return (
    <>
      {blobs.map((blob, index) => (
        <motion.div
          key={index}
          style={{
            position: "absolute",
            top: blob.top,
            left: blob.left,
            width: blob.size,
            height: blob.size,
            background: "radial-gradient(circle, #76DE48 0%, #B2EF61 100%)",
            borderRadius: "50%",
            filter: "blur(150px)",
            zIndex: 0,
          }}
          animate={{
            y: ["0vh", "-10vh", "0vh"],
            x: ["0vw", "5vw", "-5vw", "0vw"],
          }}
          transition={{
            duration: blob.duration * 0.7,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
            delay: blob.delay,
          }}
        />
      ))}
    </>
  );
}

export default AnimatedBlobs;