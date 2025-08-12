import React from 'react'
import AnimatedBackground from '../components/animatedbackground'


function splashscreen() {
  return (
    <AnimatedBackground>
<div className="relative flex flex-col items-center justify-center w-screen h-screen bg-gradient-to-b from-gray-50 to-green-50 text-center px-6">
      {/* Logo */}
      <div className="absolute top-6 left-6">
        <h1 className="text-2xl font-light italic">
          Con<span className="font-normal not-italic">f</span>ido
        </h1>
      </div>

      {/* Main content */}
      <div className="flex flex-col items-center max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-bold">
          Say Hello to Great Conversation.
        </h1>

        <p className="mt-3 text-gray-600 text-lg">
          Overcome shyness with a simple hello.
        </p>

        <div className="mt-6">
          <h2 className="font-semibold mb-2 text-lg">Why you’ll love it:</h2>
          <p className="text-gray-700 leading-relaxed">
            This is your space to talk about anything – no judgment, no
            pressure, just real conversations with people who get it. Whether
            you’re feeling shy, lonely, or just need someone to chat with,
            we’re here to make it easy and comfortable.
          </p>
        </div>

      <button>
        Start Conversation
      </button>

        <div className="mt-8">
          <img
            src="https://via.placeholder.com/150"
            alt="avatar"
            className="w-40 h-40 rounded-full object-cover"
          />
        </div>
      </div>
    </div>
</AnimatedBackground>
  )
}

export default splashscreen