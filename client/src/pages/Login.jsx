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
    // 'bg-base-200' gives a subtle grey background to make the white card pop
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      
      {/* Card Container */}
      <div className="card w-full max-w-md bg-base-100 shadow-xl border border-gray-100">
        <div className="card-body">
          
          <div className="text-center mb-4">
            <h2 className="text-3xl font-bold text-blue-600">StudyFlow</h2>
            <p className="text-gray-500 mt-2">Welcome back! Please enter your details.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Email Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Email Address</span>
              </label>
              <input 
                type="email" 
                placeholder="email@example.com" 
                className="input input-bordered focus:input-primary w-full" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
              />
            </div>

            {/* Password Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Password</span>
                <a href="#" className="label-text-alt link link-hover text-blue-600">Forgot password?</a>
              </label>
              <input 
                type="password" 
                placeholder="••••••••" 
                className="input input-bordered focus:input-primary w-full" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
              />
            </div>

            {/* Submit Button */}
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary text-white text-lg">
                Login
              </button>
            </div>

          </form>

          {/* Social / Footer Links */}
          <div className="divider">OR</div>
          
          <p className="text-center text-sm">
            Don't have an account? 
            <a href="/register" className="text-blue-600 font-bold ml-1 link link-hover">Sign up</a>
          </p>

        </div>
      </div>
    </div>
  )
}

export default Login