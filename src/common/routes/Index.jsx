import { Routes, Route } from "react-router-dom"
import ChatScreen from "../../features/screens/ChatScreen"
import ChooseAvatar from "../../components/select_avatar"
import SplashScreen from "../../screen/splashscreen"

function Index() {
    return (
        <Routes>
            <Route path="chatscreen" element={<ChatScreen />} />
            <Route path="choose-avatar" element={<ChooseAvatar />} />
            <Route path="" element={<SplashScreen />} />
        </Routes>
    )
}

export default Index