import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import EditTask from './EditTask';

import { IoChevronBack, IoCalendarOutline, IoFlagOutline } from "react-icons/io5";
import { FiEdit3 } from "react-icons/fi";
import { IoLogOutOutline } from "react-icons/io5";
import { LuCircleUserRound } from "react-icons/lu";

function TaskDetails() {
  const { user, logout } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const name = JSON.parse(localStorage.getItem('userInfo'))?.user?.name || user?.name || 'User';
  const firstLetter = name.charAt(0).toUpperCase();

  // edit task
  const [selectedTask, setSelectedTask] = useState(null);
  
    const openEditModal = (e, task) => {
      e.stopPropagation(); // Stop card click navigation
      setSelectedTask(task);
    };
  
    useEffect(() => {
      if (selectedTask) {
        document.getElementById('edit_task_modal').showModal();
      }
    }, [selectedTask]);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const token = JSON.parse(localStorage.getItem('userInfo')).token;
        const res = await axios.get(`http://localhost:5000/api/tasks/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setTask(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchTask();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-slate-50">
        <span className="loading loading-spinner loading-lg text-blue-600"></span>
      </div>
    );
  }

  if (!task) return <div className="p-20 text-center">Task not found</div>;


  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar>
        <li className='text-blue-700 lg:hidden'><a onClick={logout}> <LuCircleUserRound/>Hi! {JSON.parse(localStorage.getItem('userInfo'))?.user?.name || user?.name}</a></li>
          <li><Link to='/' className="text-gray-600 hover:text-blue-600 font-medium tooltip tooltip-bottom mt-2" data-tip="Go to home">Home</Link></li>
          <li><Link to='/tasks' className="text-gray-600 hover:text-blue-600 font-medium tooltip tooltip-bottom mt-2" data-tip="Go to home">My Tasks</Link></li>
          <li className='text-red-600 lg:hidden ml-20'><a onClick={logout}>Logout <IoLogOutOutline/> </a></li>
          
          <li>
            <div className="dropdown dropdown-left dropdown-bottom hidden lg:flex rounded-full w-14 h-14 items-center justify-center hover:bg-gray-300">
              <div tabIndex={0} role="button" className="avatar cursor-pointer rounded-full">
                <div className="avatar placeholder">
                  <div className="bg-blue-100 text-neutral-content text-lg w-12 rounded-full border-2 border-blue-300">
                    <span>{firstLetter}</span>
                  </div>
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

      <main className="flex-1 max-w-4xl mx-auto w-full px-6 py-10">
        {/* Breadcrumb / Back button */}
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center text-slate-500 hover:text-blue-600 mb-6 transition-colors font-medium"
        >
          <IoChevronBack className="mr-1" /> Back to Tasks
        </button>

        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
          {/* Header Accent */}
          <div className="h-3 bg-blue-600 w-full"></div>
          
          <div className="p-8 md:p-12">
            <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-8">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                    task.isComplete ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
                  }`}>
                    {task.isComplete ? 'Completed' : 'In Progress'}
                  </span>
                  <span className="flex items-center text-slate-400 text-xs font-bold uppercase tracking-wider">
                    <IoFlagOutline className="mr-1" /> {task.priority || 'Medium'}
                  </span>
                </div>
                <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
                  {task.title}
                </h1>
              </div>

              <Link 
                onClick={(e) => openEditModal(e, task)}
                className="btn btn-outline border-slate-200 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 rounded-xl"
              >
                <FiEdit3 /> Edit Task
              </Link>
            </div>

            <div className="space-y-8">
              {/* Description Section */}
              <div>
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-3">Description</h3>
                <p className="text-slate-600 leading-relaxed text-lg">
                  {task.description || "No description provided for this task."}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8 border-t border-slate-50">
                {/* Date Section */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 flex justify-center items-center text-blue-600 text-xl">
                    <IoCalendarOutline />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase">Due Date</p>
                    <p className="text-slate-700 font-bold">
                      {task.dueDate ? new Date(task.dueDate).toLocaleDateString('en-US', {
                        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
                      }) : "No deadline set"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {selectedTask && (
        <EditTask
          task={selectedTask}
          tasks={task}
          setTasks={setTask}
        />
      )}

      <Footer />
    </div>
  );
}

export default TaskDetails;