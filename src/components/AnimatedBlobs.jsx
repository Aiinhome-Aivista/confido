// import React from "react";
// import { motion } from "framer-motion";

// const blobs = [
//   { size: "400px", top: "10%", left: "5%", duration: 8, delay: 0 },
//   { size: "350px", top: "40%", left: "60%", duration: 10, delay: 2 },
//   { size: "450px", top: "70%", left: "30%", duration: 12, delay: 4 },
// ];

// function AnimatedBlobs() {
//   return (
//     <>
//       {blobs.map((blob, index) => (
//         <motion.div
//           key={index}
//           style={{
//             position: "absolute",
//             top: blob.top,
//             left: blob.left,
//             width: blob.size,
//             height: blob.size,
//             background: "radial-gradient(circle, #76DE48 0%, #B2EF61 100%)",
//             borderRadius: "50%",
//             filter: "blur(150px)",
//             zIndex: 0,
//             pointerEvents: "none",
//           }}
//           animate={{
//             y: ["0vh", "-10vh", "0vh"],
//             x: ["0vw", "5vw", "-5vw", "0vw"],
//           }}
//           transition={{
//             duration: blob.duration * 0.7,
//             repeat: Infinity,
//             repeatType: "loop",
//             ease: "easeInOut",
//             delay: blob.delay,
//           }}
//         />
//       ))}
//     </>
//   );
// }

// export default AnimatedBlobs;

import React, { useEffect, useRef } from "react";

const blobs = [
  { size: 400, color: "radial-gradient(circle, #76DE48 0%, #B2EF61 100%)" },
  { size: 350, color: "radial-gradient(circle, #76DE48 0%, #B2EF61 100%)"},
  { size: 450, color: "radial-gradient(circle, #76DE48 0%, #B2EF61 100%)"},
];

function AnimatedBlobs() {
  const blobRefs = useRef([]);
  const velocities = useRef([]);

  useEffect(() => {
    const screenW = window.innerWidth;
    const screenH = window.innerHeight;

    // Initialize random positions and velocities
    blobRefs.current.forEach((blob, i) => {
      if (blob) {
        const size = blobs[i].size;
        blob.x = Math.random() * (screenW - size);
        blob.y = Math.random() * (screenH - size);

        velocities.current[i] = {
          vx: (Math.random() - 0.5) * 2, // speed in px/frame
          vy: (Math.random() - 0.5) * 2,
        };

        blob.style.transform = `translate(${blob.x}px, ${blob.y}px)`;
      }
    });

    function animate() {
      blobRefs.current.forEach((blob, i) => {
        if (!blob) return;

        const size = blobs[i].size;
        let { vx, vy } = velocities.current[i];

        blob.x += vx;
        blob.y += vy;

        // Bounce on edges
        if (blob.x <= 0 || blob.x + size >= screenW) {
          velocities.current[i].vx *= -1;
          blob.x = Math.max(0, Math.min(blob.x, screenW - size));
        }
        if (blob.y <= 0 || blob.y + size >= screenH) {
          velocities.current[i].vy *= -1;
          blob.y = Math.max(0, Math.min(blob.y, screenH - size));
        }

        blob.style.transform = `translate(${blob.x}px, ${blob.y}px)`;
      });

      requestAnimationFrame(animate);
    }

    animate();
  }, []);

  return (
    <>
      {blobs.map((blob, index) => (
        <div
          key={index}
          ref={(el) => (blobRefs.current[index] = el)}
          style={{
            position: "absolute",
            width: `${blob.size}px`,
            height: `${blob.size}px`,
            background: blob.color,
            borderRadius: "50%",
            filter: "blur(150px)",
            zIndex: 0,
            pointerEvents: "none",
          }}
        />
      ))}
    </>
  );
}

export default AnimatedBlobs;
