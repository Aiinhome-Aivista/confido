import { Routes, Route } from "react-router-dom"
import Confido from "../../screen/Confido"


function Index() {
    return (
        <Routes>
            <Route path="" element={<Confido />} />
        </Routes>
    )
}

export default Index