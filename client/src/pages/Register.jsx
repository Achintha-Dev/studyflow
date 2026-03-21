import React, { useState } from 'react'
import { useNavigate , Link } from 'react-router-dom'

import toast from 'react-hot-toast'
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

import Form from '../components/Form'
import API from '../services/Api';

function Register() {
    const [formData, setFormData] = useState({name:'', email:'', password:''});
    const [showPassword, setShowPassword] = useState(false);
    const [isError, setIsError] = useState(false);
    const navigator = useNavigate();

    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsError(false);

      try {
        await API.post('/auth/register', formData);
        toast.success('Registration successful! Please login.');
        navigator('/login');

      } catch (error) {
        setIsError(true);
        toast.error(error.response?.data?.message || 'Registration Failed');
      }

    }

  return (
    <Form
      text1={"Welcome! Please enter your details."}
      text2={"Create Account"}
      text3={"Already have an account?"}
      text4={"Login"}
      imgLink={"https://img.freepik.com/free-vector/sign-up-concept-illustration_114360-7885.jpg"}
      pageLink={"/login"}
    >

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* name input field and label */}
        <div className="form-control">
          <label className="label"><span className="label-text font-semibold text-slate-700">Full Name</span></label>
          <input 
            type="text" 
            placeholder="John Doe" 
            className={`input bg-gray-50 text-gray-800 input-bordered w-full h-12 rounded-xl pr-12 transition-all 
              ${isError ? 'bg-gray-50 text-red-600 border-red-600 focus:border-red-600': 'border-gray-200 focus:border-[#2563eb]'}`}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            required 
          />
        </div>

        {/* email input field and name */}
        <div className="form-control">
          <label className="label"><span className="label-text font-semibold text-slate-700">Email Address</span></label>
          <input 
            type="email" 
            placeholder="name@student.com" 
            className={`input bg-gray-50 text-gray-800 input-bordered w-full h-12 rounded-xl pr-12 transition-all 
              ${isError ? 'bg-gray-50 text-red-600 border-red-600 focus:border-red-600': 'border-gray-200 focus:border-[#2563eb]'}`}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required 
          />
        </div>

        <div className="form-control">
          <label className="label"><span className="label-text font-semibold text-slate-700">Password</span></label>
          <div className="relative">
            {/* password input field */}
            <input 
              type={showPassword ? "text" : "password"} 
              placeholder="••••••••" 
              className={`input bg-gray-50 text-gray-800 input-bordered w-full h-12 rounded-xl pr-12 transition-all 
                ${isError ? 'bg-gray-50 text-red-600 border-red-600 focus:border-red-600': 'border-gray-200 focus:border-[#2563eb]'}`}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required 
            />
            <button
              type="button"
              className="absolute right-4 top-1/2 -translate-y-1/2 opacity-60"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <IoEyeOffOutline className="w-5 h-5 opacity-90 hover:opacity-100 transition-opacity" />
              ) : (
                <IoEyeOutline className="w-5 h-5 opacity-90 hover:opacity-100 transition-opacity" />
              )}
            </button>
          </div>
        </div>

        <button type="submit" className="btn bg-[#2563eb] hover:bg-blue-700 border-none text-white w-full h-12 text-lg normal-case rounded-xl shadow-lg shadow-blue-100 mt-4 transition-all">
            Register
        </button>
      </form>


    </Form>
  )
}

export default Register