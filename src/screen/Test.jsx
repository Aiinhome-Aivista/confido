import React, { useState } from 'react'
import Header from '../components/header'
import Test2 from './Test2';

function Test() {
    const [showNewComponent, setShowNewComponent] = useState(false);

    return (
        <div className='flex flex-col justify-center items-center text-red-600 w-full h-full p-4'>
            <Header />
            {showNewComponent ? <Test2 /> : (
                <div className="text-center mt-8">
                    <p>hello</p>
                    <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded mt-4" onClick={() => setShowNewComponent(true)}>
                        i am button - click me
                    </button>
                </div>
            )}
        </div>
    )
}

export default Test