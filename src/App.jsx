import { useState } from 'react'
import SplashScreen from './screen/splashscreen'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <SplashScreen/>
    </>
  )
}

export default App
