import { useState, useEffect } from "react";
import { BrowserRouter } from 'react-router-dom'
import Index from './common/routes/Index'
import MouseClickSounds from './components/MouseClickSound.jsx'
import AnimatedBlobs from './components/AnimatedBlobs'
import { AuthProvider } from './common/helper/AuthContext.jsx'
import UnSupportedScreen from "./screen/UnSupportedScreen.jsx";

function App() {
  const [isSupported, setIsSupported] = useState(true);

  useEffect(() => {
    const checkSupport = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const isLandscape = width > height;

      if (isLandscape) {
        // Landscape → allow all devices
        setIsSupported(true);
      } else {
        // Portrait → block
        setIsSupported(false);
      }
    };

    checkSupport();
    window.addEventListener("resize", checkSupport);
    window.addEventListener("orientationchange", checkSupport);

    return () => {
      window.removeEventListener("resize", checkSupport);
      window.removeEventListener("orientationchange", checkSupport);
    };
  }, []);

  const isMobile = !isSupported;


  if (isMobile) {
    return <UnSupportedScreen />;
  }

  return (
    <>
      <MouseClickSounds />
      <div style={{ position: "relative", minHeight: "100vh", overflow: "hidden" }}>

        <AuthProvider>
          <AnimatedBlobs />
          < div style={{ position: "relative", zIndex: 10 }}>
            <BrowserRouter>
              <Index />
            </BrowserRouter>
          </div>
        </AuthProvider>
      </div>
    </>
  )
}

export default App