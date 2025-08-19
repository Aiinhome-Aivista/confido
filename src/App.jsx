import { BrowserRouter } from 'react-router-dom'
import Index from './common/routes/Index'
import MouseClickSounds from './components/MouseClickSound.jsx'
import AnimatedBlobs from './components/AnimatedBlobs'
import { AuthProvider } from './common/helper/AuthContext.jsx'

function App() {

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



