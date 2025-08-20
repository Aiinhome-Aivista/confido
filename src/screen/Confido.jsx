import { useState, useContext } from 'react';
import { AuthContext } from "../common/helper/AuthContext.jsx";
import Header from '../components/header';
import SplashScreen from './SplashScreen';
import ChooseAvatar from '../components/select_avatar';
import LoginModal from '../common/modal/LoginModal.jsx';

function Confido() {
    const [loadAvatars, setLoadAvatars] = useState(false)
    const { openLoginModal } = useContext(AuthContext);

    return (
        <div className='flex flex-col h-[calc(100vh)] w-[calc(100vw)]'>
            {openLoginModal && <LoginModal />}
            <div className='h-1/10'>
                <Header />
            </div>
            <div className="h-9/10">
                {loadAvatars
                    ? <ChooseAvatar />
                    : <SplashScreen setLoadAvatars={setLoadAvatars} />}
            </div>
        </div>
    )
}

export default Confido