
import { BrowserRouter } from 'react-router-dom'
import Index from './common/routes/Index'
import MouseClickSounds from './components/MouseClickSound.jsx'

function App() {

  return (
    <>
      <MouseClickSounds />
      <BrowserRouter>
        <Index />
      </BrowserRouter>
    </>
  )
}

export default App
