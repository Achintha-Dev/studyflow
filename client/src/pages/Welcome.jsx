import React from 'react'
import welcomeImage from '../assets/undraw_waiting-for-you_xhp2.svg'
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'

function Welcome() {
  return (
    <div>
        <Navbar>
            <li><Link to='/login'>Login</Link></li>
            <li><Link to='/register'>Register</Link></li>
        </Navbar>

        {/* 'flex-col' for mobile, 'lg:flex-row' for large screens*/ }
        <div className="min-h-screen flex flex-col lg:flex-row items-center justify-between px-6 py-12 lg:px-20 bg-gray-50">

        {/* 1. Content Section */}
        {/* 'order-2 lg:order-1' ensures text comes after image on mobile if desired, or keep standard */}
        <div className="w-full lg:w-1/2 text-center lg:text-left space-y-6 mb-12 lg:mb-0">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-blue-900 leading-tight">
            Manage Your Tasks <br /> 
            <span className="text-blue-500">Effortlessly</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-lg mx-auto lg:mx-0">
            Stay organized, focused, and in control of your daily goals with StudyFlow. 
            </p>
            
            {/* Buttons: Stacked on tiny phones, row on tablets up */}
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
            
            <Link to='/login'>
                <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition w-full sm:w-auto">
                    Get Started
                </button>
            </Link>
            
            <button className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition w-full sm:w-auto">
                Learn More
            </button>
            </div>
        </div>

        {/* 2. Image Section */}
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
            <img 
            src={welcomeImage} 
            alt="Welcome Illustration" 
            className="w-4/5 md:w-3/4 lg:w-full max-w-2xl transform hover:scale-105 transition duration-500" 
            />
        </div>
        </div>
    </div>
  )
}

export default Welcome