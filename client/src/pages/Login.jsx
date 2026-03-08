import { AuthContext } from "../context/AuthContext";
import axios from 'axios'
import { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom'


function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await axios.post('http://localhost:5000/api/auth/login', {email, password});

            login(response.data);

            alert('login successful');
            navigate('/tasks'); // go to home/dashboard

        } catch (error) {
            alert(error.response?.data?.message || "Login failed");
        }
    };
  return (
      
    <div className="min-h-screen flex flex-col lg:flex-row bg-white">
            
      {/* --- LEFT SIDE: THE FORM --- */}
      <div className="flex-1 flex items-center justify-center px-8 py-12 lg:px-24">
        <div className="w-full max-w-md">
            <div className="mb-10 text-center lg:text-left">
                {/* 2. Brand Blue from reference image */}
                <h2 className="text-4xl font-extrabold text-[#2563eb] tracking-tight mb-2">StudyFlow</h2>
                <h1 className="text-2xl font-bold text-gray-800 lg:text-3xl">Manage Your Tasks Effortlessly</h1>
                <p className="text-gray-500 mt-4">Welcome back! Please enter your details.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="form-control">
                    <label className="label"><span className="label-text font-semibold text-gray-700">Email Address</span></label>
                    <input 
                        type="email" 
                        placeholder="email@example.com" 
                        className="input input-bordered border-gray-200 focus:border-[#2563eb] w-full h-12 rounded-xl" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text font-semibold text-gray-700">Password</span>
                        <a href="#" className="label-text-alt link link-hover text-[#2563eb]">Forgot?</a>
                    </label>
                    <input 
                        type="password" 
                        placeholder="••••••••" 
                        className="input input-bordered border-gray-200 focus:border-[#2563eb] w-full h-12 rounded-xl" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                </div>

                <div className="pt-4">
                    {/* 3. High-contrast Blue Button matching the CTA in image */}
                    <button type="submit" className="btn bg-[#2563eb] hover:bg-[#1d4ed8] border-none text-white w-full h-12 text-lg normal-case rounded-xl shadow-lg shadow-blue-100">
                        Get Started
                    </button>
                </div>
            </form>

            <p className="text-center mt-8 text-gray-600">
                Don't have an account? 
                <a href="/register" className="text-[#2563eb] font-bold ml-1 hover:underline">Sign up</a>
            </p>
        </div>
      </div>

      {/* --- RIGHT SIDE: THE ILLUSTRATION (Hidden on Mobile) --- */}
      {/* 4. Added 'hidden lg:flex' to ensure this only shows on desktops */}
      <div className="hidden lg:flex flex-1 bg-blue-50 items-center justify-center p-12">
        <div className="max-w-xl text-center">
          {/* Placeholder for your illustration similar to image_737484.png */}
          <img 
              src="https://img.freepik.com/free-vector/growth-concept-illustration_114360-5235.jpg" 
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

export default Login