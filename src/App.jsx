
import { BrowserRouter } from 'react-router-dom'
import Index from './common/routes/Index'
import MouseClickSounds from './components/MouseClickSound.jsx'
import AnimatedBlobs from './components/AnimatedBlobs'

function App() {

  return (
    <>
      <MouseClickSounds />
    <div style={{ position: "relative", minHeight: "100vh", overflow: "hidden" }}>
      <AnimatedBlobs/>
      <BrowserRouter>
        <Index />
      </BrowserRouter>
    </div>
    </>
  )
}

export default App
