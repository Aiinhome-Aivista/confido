import { Routes, Route } from "react-router-dom"
import ChatScreen from "../../features/screens/ChatScreen"

function Index() {
    return (
        <Routes>
            <Route path="" element={<ChatScreen />} />
        </Routes>
    )
}

export default Index