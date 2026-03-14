import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from 'axios';

import Navbar from '../components/Navbar'
import { AuthContext } from '../context/AuthContext';

import { IoLogOutOutline } from "react-icons/io5";
import { LuCircleUserRound } from "react-icons/lu";
import { FiEdit3 } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const { user, logout } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const name = JSON.parse(localStorage.getItem('userInfo'))?.user?.name || user?.name || 'User';
  const firstLetter = name.charAt(0).toUpperCase();

  useEffect(() => {
    const fetchTask = async ()=> {
      try {
        const token = JSON.parse(localStorage.getItem('userInfo')).token; 
        const res = await axios.get('http://localhost:5000/api/tasks', {
            headers: { Authorization: `Bearer ${token}` }
        });
        setTasks(res.data);

        toast.success('Welcome back!');
        setLoading(false);

      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to load tasks!');

      } finally {
        setLoading(false);
      }
    };
    fetchTask();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Nav bar */}
      <Navbar>
        
        <li className='text-blue-700 lg:hidden'><a onClick={logout}> <LuCircleUserRound/>Hi! {JSON.parse(localStorage.getItem('userInfo'))?.user?.name || user?.name}</a></li>
        <li><Link to='/' className="text-gray-600 hover:text-blue-600 font-medium tooltip tooltip-bottom mt-2" data-tip="Go to home">Home</Link></li>
        <li className='text-red-600 lg:hidden ml-20'><a onClick={logout}>Logout <IoLogOutOutline/> </a></li>
        
        <li>
          <div className="dropdown dropdown-left dropdown-bottom hidden lg:flex">

            <div tabIndex={0} role="button" className="avatar cursor-pointer">
              <div className="w-10 rounded-full ring ring-offset-2 text-neutral-content ">
                <span className='text-3xl ml-2.5'>{firstLetter}</span>
              </div>
            </div>

            <ul
              tabIndex={0}
              className="dropdown-content menu bg-white rounded-box w-52 p-2 shadow"
            >
              <li><a>Profile <LuCircleUserRound/> </a></li>
              <li className='text-red-600'><a onClick={logout}>Logout <IoLogOutOutline/> </a></li>
            </ul>

          </div>
        </li>
      </Navbar>

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-10 lg:px-24">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
            <div>
                <p className='text-lg'>Hi! {JSON.parse(localStorage.getItem('userInfo'))?.user?.name || user?.name || "User"}</p>
                <h1 className="text-3xl font-black text-slate-900 tracking-tight">Your Tasks</h1>
                <p className="text-slate-500 mt-1">You have {tasks.length} tasks for today.</p>
            </div>
            {/* create task button */}
            <button className="btn bg-[#2563eb] hover:bg-blue-700 text-white border-none rounded-xl px-6 shadow-lg shadow-blue-100">
                + New Task
            </button>
        </div>

        {loading ? (
            <div className="flex justify-center py-20">
                <span className="loading loading-spinner loading-lg text-blue-600"></span>
            </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
                {tasks.map((task) => (
                    <div key={task._id} className="bg-blue-100 p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow group">
                        <div className="flex justify-between items-start mb-4">

                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                task.status === 'completed' ? 'bg-green-50 text-green-600' : 'bg-blue-50 text-blue-600'
                            }`}>
                                {task.status}
                            </span>

                            {/* edit delete buttons */}
                            <div className="dropdown dropdown-end">
                              <div tabIndex={0} role="button" className="btn btn-ghost btn-sm text-xl text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors m-1"> <HiOutlineDotsHorizontal /> </div>
                              <ul tabIndex={0} className="dropdown-content menu bg-blue-50 rounded-xl z-[1] w-16 p-1.5 shadow-xl border border-slate-100 pt-2">
                                <li className='tooltip tooltip-right' data-tip="Edit"><Link> <FiEdit3 className='text-green-500 text-lg ' /> </Link></li>
                                <li className='tooltip tooltip-right' data-tip="Delete"><Link> <MdDeleteOutline className='text-red-500 text-lg ' /> </Link></li>
                              </ul>
                            </div>

                        </div>

                        <h3 className="text-lg font-bold text-slate-800 mb-2">{task.title}</h3>
                        <p className="text-slate-500 text-sm line-clamp-2">
                          {task.description.split(" ").slice(0, 5).join(" ")}
                          {task.description.split(" ").length > 5 ? "..." : ""}
                        </p>

                        <div className="mt-6 pt-4 border-t border-slate-50 flex justify-between items-center">
                            <span className="text-xs text-slate-400 font-medium">Due: {task.dueDate
                              ? new Date(task.dueDate).toLocaleDateString('en-US',{
                                month: 'short', 
                                day: 'numeric', 
                                year: 'numeric'
                              })
                            : 'No date'}</span>
                            <input type="checkbox" className="checkbox checkbox-success checkbox-sm rounded-md" checked={task.status === 'completed'} readOnly />
                        </div>

                    </div>
                ))}
            </div>
          )}
      </main>

    </div>
  )
}

export default Tasks