import { Routes, Route } from "react-router-dom"
import ChatScreen from "../../features/screens/ChatScreen"
import ChooseAvatar from "../../components/select_avatar"

import SpalshScreen from "../../screens/splashscreen"

function Index() {
    return (
        <Routes>
            {/* <Route path="chat-screen" element={<ChatScreen />} /> */}
            <Route path="" element={<ChooseAvatar />} />
            <Route path="spalsh" element={<SpalshScreen/>} />
            {/* <Route path="" element={<ChatScreen />} /> */}
        </Routes>
    )
}

export default Index