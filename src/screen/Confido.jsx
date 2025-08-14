import { useState } from 'react';
import Header from '../components/header';
import SplashScreen from './SplashScreen';
import ChooseAvatar from '../components/select_avatar';

function Confido() {
    const [loadAvatars, setLoadAvatars] = useState(false)
    return (
        <div className='h-[calc(100vh)] w-[calc(100vw)] p-[0.5rem]'>
            <div className='h-1/10'>
                <Header />
            </div>
            <div className="h-9/10">
                {loadAvatars ? <ChooseAvatar /> : <SplashScreen setLoadAvatars={setLoadAvatars} />}
            </div>
        </div>
    )
}

export default Confido