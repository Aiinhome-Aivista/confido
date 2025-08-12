import { Routes, Route } from "react-router-dom"
import ChatScreen from "../../features/screens/ChatScreen"
import SplashScreen from "../../screen/splashscreen"

function Index() {
    return (
        <Routes>
            <Route path="chat-screen" element={<ChatScreen />} />
            <Route path="splash-screen" element={<SplashScreen />} />
        </Routes>
    )
}

export default Index