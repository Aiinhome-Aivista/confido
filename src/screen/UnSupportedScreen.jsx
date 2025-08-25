import React from 'react'

function UnSupportedScreen() {
    return (
        <div className='flex flex-col items-center justify-center h-screen'>

            <h1 className='text-3xl font-bold'>Mobile view is not supported</h1>
            <p className='text-lg'>Please rotate your device to landscape view.</p>

        </div>
    )
}

export default UnSupportedScreen