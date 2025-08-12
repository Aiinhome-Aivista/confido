import { Routes, Route } from "react-router-dom"
import ChatScreen from "../../features/screens/ChatScreen"
import ChooseAvatar from "../../components/select_avatar"
import SplashScreen from "../../screen/splashscreen"

function Index() {
    return (
        <Routes>
            <Route path="chat-screen" element={<ChatScreen />} />
            <Route path="/select-avatar" element={<ChooseAvatar />} />
            <Route path="splash-screen" element={<SplashScreen />} />
        </Routes>
    )
}

export default Index