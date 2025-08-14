import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion";
import confidoSvg from "../assets/icons/confido_logo.svg";
import { Experience } from "../features/characters/hema/experience";
import { createNoise2D } from "simplex-noise";

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
  beeRef.current.rotation.z = (targetY - beeRef.current.position.y) * 0.1;
  beeRef.current.rotation.y += delta * 8;
});

  return <primitive ref={beeRef} object={scene} scale={0.2} />;
}
function BeeScene({ mousePosition }) {
  return (
   <Canvas
  style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none" }}
  orthographic
  camera={{ zoom: 100, position: [0, 0, 5] , }}
>
  <ambientLight intensity={1} />
  <directionalLight position={[5, 5, 5]} />
  <Bee mousePosition={mousePosition} />
</Canvas>
  );
}

function SplashScreen() {
  const blobs = [
    { size: "400px", top: "10%", left: "5%", duration: 8, delay: 0 },
    { size: "350px", top: "40%", left: "60%", duration: 10, delay: 2 },
    { size: "450px", top: "70%", left: "30%", duration: 12, delay: 4 },
  ];

  const mousePosition = useRef(null);

  useEffect(() => {
    let timeout;
    const handleMove = (e) => {
      mousePosition.current = { x: e.clientX, y: e.clientY };
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        mousePosition.current = null; // back to random mode after idle
      }, 2000);
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        backgroundColor: "#FFFFFF",
        overflow: "hidden",
      }}
    >
      {/* Floating blobs */}
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
            x: ["0px", "50px", "-50px", "0px"],
            y: ["0px", "-50px", "50px", "0px"],
          }}
          transition={{
            duration: blob.duration,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
            delay: blob.delay,
          }}
        />
      ))}

      {/* Logo */}
      <img
        src={confidoSvg}
        alt="Confido Logo"
        style={{
          position: "absolute",
          top: "9px",
          left: "20px",
          height: "85px",
          width: "120px",
          zIndex: 1,
        }}
      />

      {/* Text */}
      <div className="w-full min-h-screen flex flex-col items-center justify-start text-black pt-20 z-2">
        <h1 className="font-extrabold text-5xl md:text-6xl text-center mb-2 leading-tight">
          Say Hello to Great
          <br />
          Conversation.
        </h1>
        <p className="font-normal text-lg text-center mb-6">
          Overcome shyness with a simple hello.
        </p>
        <div className="font-bold text-lg text-center mb-2">Why you’ll love it:</div>
        <p className="font-normal text-base text-center max-w-xl mb-8">
          This is your space to talk about anything - no judgment, not pressure,
          Just real conversations with people who get it. Whether you’re feeling
          shy, lonely, or just need someone to chat with, we’re here to make it
          easy and confortable.
        </p>
        <button className="px-8 py-3 rounded-full bg-gray-200 text-black font-bold text-lg z-4 border-none cursor-pointer mb-8 shadow">
          Start conversation
        </button>

        {/* 3D Hand Experience */}
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

      {/* 🐝 Bee scene */}
      <BeeScene mousePosition={mousePosition} />

      {/* Bee buzzing sound */}
      {/* <audio src="/sounds/bee-buzz.mp3" autoPlay loop /> */}
    </div>
  );
}

export default SplashScreen;