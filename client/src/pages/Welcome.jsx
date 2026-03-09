import React from 'react'
import welcomeImage from '../assets/undraw_waiting-for-you_xhp2.svg'
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'

function Welcome() {
  return (
    <div>
        <div className="bg-white min-h-screen">
            <Navbar>
                <li><Link to='/login' className="text-gray-600 hover:text-blue-600 font-medium">Login</Link></li>
                <li><Link to='/register' className="text-gray-600 hover:text-blue-600 font-medium">Register</Link></li>
            </Navbar>

            {/* Main Hero: Responsive flex direction and clean whitespace */}
            <div className="flex flex-col lg:flex-row items-center justify-between px-6 py-10 md:py-20 lg:px-24">

            {/* Text Section: Centered on mobile, left-aligned on desktop */}
            <div className="w-full lg:w-1/2 text-center lg:text-left z-10">
                <h1 className="text-5xl md:text-6xl lg:text-8xl font-black text-slate-900 tracking-tight leading-[1.1]">
                Manage Your Tasks <br /> 
                <span className="text-blue-600">Effortlessly</span>
                </h1>
                
                <p className="mt-8 text-lg md:text-xl text-slate-500 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Stay organized, focused, and in control of your daily goals with 
                <span className="font-bold text-slate-800"> StudyFlow</span>. 
                </p>
                
                {/* Responsive Buttons: Full-width on mobile, auto on desktop */}
                <div className="mt-10 flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
                <Link to='/login' className="w-full sm:w-auto">
                    <button className="w-full bg-blue-600 text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-200 transition-all duration-300">
                        Get Started
                    </button>
                </Link>
                
                <button className="w-full sm:w-auto border-2 border-slate-200 text-slate-600 px-10 py-4 rounded-xl font-bold text-lg hover:bg-slate-50 hover:border-slate-300 transition-all">
                    Learn More
                </button>
                </div>
            </div>

            {/* Image Section: Hidden or scaled based on screen size */}
            <div className="w-full lg:w-1/2 mt-16 lg:mt-0 flex justify-center lg:justify-end">
                <div className="relative">
                {/* Subtle background glow for depth in Light UI */}
                <div className="absolute -inset-4 bg-blue-50 rounded-full blur-3xl opacity-70"></div>
                <img 
                    src={welcomeImage} 
                    alt="Welcome Illustration" 
                    className="relative w-full max-w-lg md:max-w-xl lg:max-w-2xl drop-shadow-2xl transform hover:-translate-y-2 transition duration-700" 
                />
                </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Welcome