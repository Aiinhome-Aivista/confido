import React from 'react';
// Tailwind CSS classes will be used for styling
import { motion } from 'framer-motion';
import confidoSvg from '../assets/icons/confido_logo.svg';

function SplashScreen() {
  const blobs = [
    { size: '400px', top: '10%', left: '5%', duration: 8, delay: 0 },
    { size: '350px', top: '40%', left: '60%', duration: 10, delay: 2 },
    { size: '450px', top: '70%', left: '30%', duration: 12, delay: 4 },
  ];
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        backgroundColor: '#FFFFFF', 
        overflow: 'hidden',
      }}
    >
      {blobs.map((blob, index) => (
        <motion.div
          key={index}
          style={{
            position: 'absolute',
            top: blob.top,
            left: blob.left,
            width: blob.size,
            height: blob.size,
            background: 'radial-gradient(circle, #76DE48 0%, #B2EF61 100%)',
            borderRadius: '50%',
            filter: 'blur(150px)', // subtle glow
            zIndex: 0,
          }}
          animate={{
            x: ['0px', '50px', '-50px', '0px'],
            y: ['0px', '-50px', '50px', '0px'],
          }}
          transition={{
            duration: blob.duration,
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'easeInOut',
            delay: blob.delay,
          }}
        />
      ))}

      {/* Logo on top */}
      <img
        src={confidoSvg}
        alt="Confido Logo"
        style={{
          position: 'absolute',
          top: '9px',
          left: '20px',
          height: '85px',
          width: '120px',
          zIndex: 1,
        }}
      />
      <div className="w-full min-h-screen flex flex-col items-center justify-start font-nunito text-black pt-20 z-2">
        <h1 className="font-extrabold text-5xl md:text-6xl text-center mb-2 leading-tight">Say Hello to Great<br />Conversation.</h1>
        <p className="font-normal text-lg text-center mb-6">Overcome shyness with a simple hello.</p>
        <div className="font-bold text-lg text-center mb-2">Why you’ll love it:</div>
        <p className="font-normal text-base text-center max-w-xl mb-8">
          This is your space to talk about anything - no judgment, not pressure, Just real conversations with people who get it. Whether you’re feeling shy, lonely, or just need someone to chat with, we’re here to make it easy and confortable.
        </p>
        <button className="px-8 py-3 rounded-full bg-gray-200 text-black font-bold text-lg border-none cursor-pointer mb-8 shadow">Start conversation</button>
      </div>
    </div>
  );
}

export default SplashScreen;
