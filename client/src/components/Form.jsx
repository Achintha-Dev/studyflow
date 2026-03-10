import React from 'react'
import { useNavigate } from 'react-router-dom'
import { IoIosArrowBack } from "react-icons/io";
import { GoHome } from "react-icons/go";

function Form({children, text1, text2, text3, text4, imgLink, pageLink}) {

    const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-white">
                    
          {/* --- LEFT SIDE: THE FORM --- */}
          <div className="flex-1 flex items-center justify-center px-8 py-12 lg:px-24">
            <div className="w-full max-w-md">
    

                <div className="mb-5 text-center lg:text-left">
                    <h2 className="text-4xl font-extrabold text-[#2563eb] tracking-tight mb-2">StudyFlow</h2>
                    <h1 className="text-2xl font-bold text-gray-800 lg:text-3xl">Manage Your Tasks Effortlessly</h1>
                    <p className="text-gray-500 mt-4">{text1}</p>
                </div>

                <div className='flex items-center gap-5'>
                    {/* Back Button */}
                    <button
                        onClick={() => navigate(-1)}
                        className=" text-gray-400 hover:text-gray-500 font-medium tooltip" data-tip='Go back'
                    >
                        <IoIosArrowBack />
                    </button>

                    <button
                        onClick={() => navigate('/')}
                        className=" text-gray-400 hover:text-gray-500 font-medium tooltip" data-tip='Go Home'
                    >
                        <GoHome />
                    </button>

                    <h1 className="text-2xl font-bold text-gray-800 lg:text-3xl text-center">{text2}</h1>
                </div>

                {/* Form is here */}
                {children}
                
                {/* move to login/register page */}
                <p className="text-center mt-8 text-gray-600">
                    {text3} 
                    <a href={pageLink} className="text-[#2563eb] font-bold ml-1 hover:underline">{text4}</a>
                </p>
    
            </div>
          </div>
    
          {/* --- RIGHT SIDE: THE ILLUSTRATION (Hidden on Mobile) --- */}
          <div className="hidden lg:flex flex-1 bg-blue-50 items-center justify-center p-12">
            <div className="max-w-xl text-center">
    
              <img 
                  src={imgLink}
                  alt="StudyFlow Growth" 
                  className="w-full h-auto mb-8 mix-blend-multiply"
              />
              <h3 className="text-2xl font-bold text-gray-800">Stay organized, focused, and in control.</h3>
              <p className="text-gray-500 mt-2">Join thousands of students managing their goals today.</p>
    
            </div>
          </div>
        </div>
  )
}

export default Form