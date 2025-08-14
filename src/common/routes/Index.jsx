import { Routes, Route } from "react-router-dom"
import ChatScreen from "../../features/screens/ChatScreen"
import ChooseAvatar from "../../components/select_avatar"

import SplashScreen from "../../screen/SplashScreen"
import Login from "../../components/login"

function Index() {
    return (
        <Routes>
            <Route path="chat-screen" element={<ChatScreen />} />
            <Route path="/choose-avatar" element={<ChooseAvatar />} />
            <Route path="/login" element={<Login/>} />

            <Route path="" element={<SplashScreen/>} />
            {/* <Route path="" element={<ChooseAvatar />} /> */}
            {/* <Route path="" element={<SplashScreen />} /> */}
            <Route path="/chat" element={<ChatScreen />} />
        </Routes>
    )
}

export default Index