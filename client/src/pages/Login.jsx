import { AuthContext } from "../context/AuthContext";
import { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

import EyeIcon from '../assets/eye_icon.svg'
import EyeOffIcon from '../assets/eye-off_icon.svg'
import image from '../assets/data_security.svg'
import Form from "../components/Form";
import API from "../services/Api";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [isError, setIsError] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsError(false); // Reset error state on every new attempt
        try{
            const response = await API.post('/auth/login', {email, password});

            login(response.data);

            // alert('login successful');
            toast.success('Welcome back!');
            navigate('/tasks'); // go to home/dashboard

        } catch (error) {
            // alert(error.response?.data?.message || "Login failed");
            setIsError(true);
            toast.error(error.response?.data?.message || 'Login Failed!');
        }
    };
  return (
      
    <Form
        text1={"Welcome Back! Please enter your details."}
        text2={"Sign In"}
        text3={"Don't have an account?"}
        text4={"Register"}
        imgLink={image}
        pageLink={'/register'}
    >

            {/* email input field and label */}
            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="form-control">
                    <label className="label"><span className="label-text font-semibold text-gray-700">Email Address</span></label>
                    <input 
                        type="email" 
                        placeholder="email@example.com" 
                        className={`input bg-gray-50 text-gray-800 input-bordered w-full h-12 rounded-xl pr-12 transition-all
                                ${isError ? 'bg-gray-50 text-red-600 border-red-600 focus:border-red-600': 'border-gray-200 focus:border-[#2563eb]'}`}
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                </div>

                {/* password input field and label */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text font-semibold text-gray-700">Password</span>
                        <a href="#" className="label-text-alt link link-hover text-[#2563eb]">Forgot?</a>
                    </label>
                    
                    <div className="relative">
                        <input 
                            /* Toggle type between 'password' and 'text' */
                            type={showPassword ? "text" : "password"} 
                            placeholder="••••••••" 
                            className={`input bg-gray-50 text-gray-800 input-bordered w-full h-12 rounded-xl pr-12 transition-all
                                ${isError ? ' bg-gray-50 text-red-600 border-red-600 focus:border-red-600': 'border-gray-200 focus:border-[#2563eb]'}`}
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                        />
                        
                        {/* The showPassword Toggle Button */}
                        <button
                            type="button"
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                           <img 
                                src={showPassword ? EyeOffIcon : EyeIcon} 
                                alt="Toggle Password Visibility" 
                                className="w-5 h-5 opacity-70 hover:opacity-100 transition-opacity"
                            />
                        </button>
                    </div>
                </div>

                {/* submit button */}
                <div className="pt-4">
                    <button type="submit" className="btn bg-[#2563eb] hover:bg-[#1d4ed8] border-none text-white w-full h-12 text-lg normal-case rounded-xl shadow-lg shadow-blue-100">
                        Sign In
                    </button>
                </div>

            </form>
    </Form>

            
            
  )
}

export default Login