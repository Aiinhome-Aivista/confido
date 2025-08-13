import { Routes, Route } from "react-router-dom"
// import SplashScreen from "../../screens/splashscreen"
// import ChatScreen from "../../features/screens/ChatScreen"
// import ChooseAvatar from "../../components/select_avatar/ChooseAvatar"
import SplashScreen  from "../../screens/splashscreen"


function Index() {
    return (
        <Routes>
            {/* <Route path="chat-screen" element={<ChatScreen />} /> */}
            {/* <Route path="" element={<ChooseAvatar />} /> */}
            {/* <Route path="" element={<ChooseAvatar />} /> */}
            {/* <Route path="" element={<SplashScreen />} /> */}
            {/* <Route path="" element={<ChatScreen />} /> */}
            <Route path="" element={<SplashScreen />} />

        </Routes>
    )
}

export default Index