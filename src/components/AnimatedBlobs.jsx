

import React, { useEffect, useRef, useState, useContext } from "react";
import { AuthContext } from "../common/helper/AuthContext.jsx";

export default function AnimatedBlobs() {
  const { selectedAvatar } = useContext(AuthContext);

  const [blobs, setBlobs] = useState([
    { size: 300, color: "radial-gradient(circle, #a8ef89ff 0%, #B2EF61 50%)" },
    { size: 350, color: "radial-gradient(circle, #a8ef89ff 0%, #B2EF61 50%)" },
    { size: 450, color: "radial-gradient(circle, #a8ef89ff 0%, #B2EF61 50%)" },
  ]);

  const blobRefs = useRef([]);
  const velocities = useRef([]);

  // update colors when avatar changes
  useEffect(() => {
    if (selectedAvatar?.color) {
      setBlobs((prev) =>
        prev.map((b) => ({
          ...b,
          color: `radial-gradient(circle, ${selectedAvatar.color} 0%, ${selectedAvatar.color} 50%)`,
        }))
      );
    }
  }, [selectedAvatar]);

  // bouncing animation
  useEffect(() => {
    const screenW = window.innerWidth;
    const screenH = window.innerHeight;

    blobRefs.current.forEach((blob, i) => {
      if (blob) {
        const size = blobs[i].size;
        blob.x = Math.random() * (screenW - size);
        blob.y = Math.random() * (screenH - size);

        velocities.current[i] = {
          vx: (Math.random() - 0.5) * 2,
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
  }, [blobs]); 

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
            zIndex: -1,
            pointerEvents: "none",
          }}
        />
      ))}
    </>
  );
}
