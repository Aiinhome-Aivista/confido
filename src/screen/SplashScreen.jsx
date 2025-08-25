import React, { useRef, useState, useEffect, useContext } from "react";
import { AuthContext } from "../common/helper/AuthContext";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";
import confidoSvg from "../assets/icons/confido_logo.svg";
import { Experience } from "../features/characters/nisa/experience";
import { createNoise2D } from "simplex-noise";
import Header from "../components/header";
import { useNavigate } from "react-router-dom";
import { swipetextdata } from "../data/data";
import ShinyText from "../components/ShinyText";

// 🐝 Bee Component
function Bee({ mousePosition }) {
  const { scene } = useGLTF("/Bee/models/bee.glb");
  const beeRef = useRef();
  const noise2D = useRef(createNoise2D()).current;
  const [time, setTime] = useState(0);

  // Idle movement target
  const idleTarget = useRef({ x: 0, y: 0 });
  const idleTimer = useRef(0);

  const setNewIdleTarget = () => {
    idleTarget.current = {
      x: (Math.random() - 0.5) * 8, // random X in scene space
      y: (Math.random() - 0.5) * 5, // random Y in scene space
    };
  };

  useEffect(() => {
    setNewIdleTarget();
  }, []);

  useFrame((state, delta) => {
    setTime((t) => t + delta);

    if (!beeRef.current) return;

    let targetX, targetY;

    if (mousePosition.current) {
      // Convert mouse to NDC (-1 to 1)
      const ndcX = (mousePosition.current.x / window.innerWidth) * 2 - 1;
      const ndcY = -(mousePosition.current.y / window.innerHeight) * 2 + 1;

      // Create a vector at z=0 in NDC space
      const vec = new THREE.Vector3(ndcX, ndcY, 0);
      vec.unproject(state.camera); // Convert to world space

      targetX = vec.x;
      targetY = vec.y;
    } else {
      // Idle movement
      idleTimer.current += delta;
      if (idleTimer.current > 3) {
        setNewIdleTarget();
        idleTimer.current = 0;
      }
      targetX = idleTarget.current.x + noise2D(time * 0.5, 0) * 0.5;
      targetY = idleTarget.current.y + noise2D(0, time * 0.5) * 0.5;
    }

    const speed = mousePosition.current ? 0.15 : 0.05;
    beeRef.current.position.x += (targetX - beeRef.current.position.x) * speed;
    beeRef.current.position.y += (targetY - beeRef.current.position.y) * speed;

    // Rotation for a "turning" effect
    beeRef.current.rotation.z = (targetY - beeRef.current.position.y) * 0.9;
    beeRef.current.rotation.y += delta * 8;
  });

  return <primitive ref={beeRef} object={scene} scale={0.2} />;
}
function BeeScene({ mousePosition }) {
  return (
    <Canvas
      style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none" }}
      orthographic
      camera={{ zoom: 100, position: [0, 0, 5], }}
    >
      <ambientLight intensity={1} />
      <directionalLight position={[5, 5, 5]} />
      <Bee mousePosition={mousePosition} />
    </Canvas>
  );
}



function SplashScreen({ setLoadAvatars }) {
  const colors = ["#1E1E1E"];
  const [showIntro, setShowIntro] = React.useState(true); // first line flag
  const [textIndex, setTextIndex] = React.useState(0);
  const [headlineVisible, setHeadlineVisible] = React.useState(false);
  const { sessionTerminated } = useContext(AuthContext);
  const mousePosition = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return; // prevent SSR issues

    let timeout;
    const handleMove = (e) => {
      mousePosition.current = { x: e.clientX, y: e.clientY };
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        mousePosition.current = null; // back to random mode after idle
      }, 2000);
    };

    window.addEventListener("mousemove", handleMove);

    return () => {
      window.removeEventListener("mousemove", handleMove);
    };
  }, []);

  useEffect(() => {
    setTimeout(() => setHeadlineVisible(true), 2000);

    // After 2.5s, hide intro and start cycling swipe texts
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 5000);

    let interval;
    setTimeout(() => {
      interval = setInterval(() => {
        setTextIndex((prev) => (prev + 1) % swipetextdata.length);
        console.log(swipetextdata.length);
      }, 3000);
    }, 1400);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);


  const requestMicrophonePermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      console.log("Microphone access granted:", stream);
      navigate("/choose-avatar");
      // You can now start conversation logic here
    } catch (err) {
      console.error("Microphone access denied:", err);
      // alert("Please allow microphone access to start the conversation.");
    }
  };

  return (
    <div>
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100vh",
          overflow: "hidden",
        }}

      >
        <div className="w-full min-h-screen flex flex-col items-center justify-start font-nunito">
          <motion.h1
            className="font-extrabold text-4xl md:text-5xl text-center mb-2 leading-tight justify-center"
            initial={{ opacity: 0, y: -40 }}
            animate={headlineVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <span className="inline-block align-middle relative overflow-hidden px-2 min-w-[20ch] max-w-[90vw] h-auto">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={showIntro ? "intro" : textIndex}
                  initial={{ y: "120%", opacity: 0 }}
                  animate={{
                    y: ["120%", "-8%", "0%"], // bounce effect
                    opacity: [0, 1, 1],
                  }}
                  transition={{
                    duration: 0.7,
                    times: [0, 0.6, 1],
                    ease: "easeOut",
                  }}
                  exit={{
                    y: "-120%",
                    opacity: [1, 1, 0],
                    transition: {
                      y: { duration: 0.6, ease: "easeIn" },
                      opacity: { duration: 0.25, delay: 0.35 },
                    },
                  }}
                  className="balanced-text block w-full font-extrabold leading-snug whitespace-normal break-words text-center"
                  style={{
                    textWrap: "balance",
                    color: showIntro ? "#1E1E1E" : colors[0], // black for intro, colored for swipe
                  }}
                >
                  {showIntro ? "Say Hello to Great Conversation." : swipetextdata[textIndex]}
             </motion.span>

              </AnimatePresence>
            </span>
          </motion.h1>

          <motion.p
            className="font-normal text-lg text-center mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8, ease: "easeOut" }}
          >
            Overcome shyness with a simple hello.
          </motion.p>

          <motion.div
            className="font-semibold text-lg text-center mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.8, ease: "easeOut" }}
          >
            Why you’ll love it:
          </motion.div>

          <motion.p
            className="font-nunito text-base text-center max-w-xl mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3, duration: 0.8, ease: "easeOut" }}
          >
            This is your space to talk about anything - no judgment, no pressure,
            just real conversations with people who get it. Whether you’re feeling
            shy, lonely, or just need someone to chat with, we’re here to make it
            easy and comfortable.
          </motion.p>
          <button
            className="start-button px-8 py-3 rounded-full font-bold text-lg border-none cursor-pointer mb-8 shadow z-3 opacity-100"
            onClick={() => {
              requestMicrophonePermission();
              setLoadAvatars(true);
            }}
          >
            <ShinyText
              text="Start Conversation"
              disabled={false}/>
              
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

      {/* 🐝 Bee scene */}
      <BeeScene mousePosition={mousePosition} />

      {/* Bee buzzing sound */}
      {/* <audio src="/sounds/bee-buzz.mp3" autoPlay loop /> */}
    </div >
  );
}

export default SplashScreen;