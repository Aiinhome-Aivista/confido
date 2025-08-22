import React from "react";
import { Environment, OrbitControls } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
// already memoized
import { Subho } from "./subho";

export const SubhoExperience = React.memo(({ disableWave = false }) => {
  return (
 <Canvas
  shadows
  camera={{
    // Camera position in 3D space: [x, y, z]
    // x → left/right, y → up/down, z → forward/back from model
    position: [0, 1.6, 3], // Slightly above the head level, close enough for zoom
    fov: 22 // Field of View (smaller = more zoomed in, larger = wider view)
  }}
>
  {/* OrbitControls target sets the point camera looks at */}
  {/* [x, y, z] → y is most important for vertical focus */}
  <OrbitControls target={[0, 1.2, 0]} /> // Focus on head area

  {/* Model position in 3D space: [x, y, z] */}
  {/* Increasing y moves the model UP in frame, decreasing y moves it DOWN */}
  <Subho position={[0, -2.2, 0]} scale={2} disableWave={disableWave} />

  {/* Environment lighting preset */}
  <Environment preset="sunset" />
</Canvas>
  );
});