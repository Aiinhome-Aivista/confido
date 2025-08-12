import { Routes, Route } from "react-router-dom"
import ChatScreen from "../../features/screens/ChatScreen"
import ChooseAvatar from "../../components/select_avtar"

function Index() {
    return (
        <Routes>
            <Route path="chat-screen" element={<ChatScreen />} />
            <Route path="/select-avatar" element={<ChooseAvatar />} />
        </Routes>
    )
}

export default Index