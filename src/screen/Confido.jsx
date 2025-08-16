import { useState, useContext } from 'react';
import { AuthContext } from "../common/helper/AuthContext.jsx";
import Header from '../components/header';
import SplashScreen from './SplashScreen';
import ChooseAvatar from '../components/select_avatar';
import Login from '../components/login.jsx';

function Confido() {
    const [loadAvatars, setLoadAvatars] = useState(false)
    const { isLogin } = useContext(AuthContext);

    return (
        <div className='h-[calc(100vh)] w-[calc(100vw)] p-[0.5rem]'>
            <div className='h-1/10'>
                <Header />
            </div>
            <div className="h-9/10">
                {isLogin
                    ? <Login />
                    : (loadAvatars
                        ? <ChooseAvatar />
                        : <SplashScreen setLoadAvatars={setLoadAvatars} />
                    )
                }
            </div>
        </div>
    )
}

export default Confido