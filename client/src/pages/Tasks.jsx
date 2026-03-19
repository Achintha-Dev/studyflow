import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate  } from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from 'axios';

import Navbar from '../components/Navbar'
import { AuthContext } from '../context/AuthContext';
import Footer from '../components/Footer';
import AddTask from './AddTask'
import EditTask from './EditTask';

import { IoLogOutOutline } from "react-icons/io5";
import { LuCircleUserRound } from "react-icons/lu";
import { FiEdit3 } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import Swal from "sweetalert2";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const { user, logout } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const name = JSON.parse(localStorage.getItem('userInfo'))?.user?.name || user?.name || 'User';
  const firstLetter = name.charAt(0).toUpperCase();
  const navigate = useNavigate();

  const handleCardClick = (e, id) => {
  // Prevent navigation if dropdown or checkbox is clicked
  if (e.target.closest('.dropdown, .no-nav') || e.target.type === 'checkbox') {
    return;
  }

  navigate(`/tasks/${id}`);
  };

  const fetchTask = async ()=> {
    try {
      const token = JSON.parse(localStorage.getItem('userInfo')).token; 
      const res = await axios.get('http://localhost:5000/api/tasks', {
          headers: { Authorization: `Bearer ${token}` }
      });
      setTasks(res.data);
      setLoading(false);

    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to load tasks!');

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTask();
  }, []);

  // check/uncheck task
  const handleToggleComplete = async (e, id) => {
    e.stopPropagation(); // Prevent card click
    try {
      const token = JSON.parse(localStorage.getItem('userInfo')).token;

      const task = tasks.find(t => t._id === id);

      const res = await axios.put(`http://localhost:5000/api/tasks/${id}`, 
        { isComplete: !task.isComplete },
        { headers: { Authorization: `Bearer ${token}` } }
      )

      toast.success('Task updated!');

      // update UI instantly
      setTasks((prev) =>
        prev.map((t) =>
          t._id === id
            ? { ...t, isComplete: res.data.task.isComplete }
            : t
        )
      );

    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update task!');
    }
  }

  const handleDeleteTask = async (e ,id) => {
    e.stopPropagation(); // Prevent card click

    const result = await Swal.fire({
      title: "Delete Task?",
      text: "You won't be able to recover this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    });

    if (!result.isConfirmed) return;

    try {
      const token = JSON.parse(localStorage.getItem('userInfo')).token;
      await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      toast.success("Task deleted!");

    // update UI instantly
    setTasks((prev) => prev.filter((task) => task._id !== id));

    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete task!');
    }

  }

  // edit task - navigate to edit page
  const [selectedTask, setSelectedTask] = useState(null);

  const openEditModal = (e, task) => {
    e.stopPropagation(); // Stop card click navigation
    setSelectedTask(task);
  };

  useEffect(() => {
    if (selectedTask) {
      document.getElementById('edit_task_modal').showModal();
    }
  }, [selectedTask])

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Nav bar */}
      <Navbar>
        
        <li className='text-blue-700 lg:hidden'><a onClick={logout}> <LuCircleUserRound/>Hi! {JSON.parse(localStorage.getItem('userInfo'))?.user?.name || user?.name}</a></li>
        <li><Link to='/' className="text-gray-600 hover:text-blue-600 font-medium tooltip tooltip-bottom mt-2" data-tip="Go to home">Home</Link></li>
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

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-10 lg:px-24">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
            <div>
                <p className='text-lg'>Hi! {JSON.parse(localStorage.getItem('userInfo'))?.user?.name || user?.name || "User"}</p>
                <h1 className="text-3xl font-black text-slate-900 tracking-tight">Your Tasks</h1>
                <p className="text-slate-500 mt-1">You have {tasks.length} tasks for today.</p>
            </div>
            {/* create task button */}
            <button className="btn bg-[#2563eb] hover:bg-blue-700 text-white border-none rounded-xl px-6 shadow-lg shadow-blue-100" onClick={() => document.getElementById('add_task_modal').showModal()} >
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
                    <div key={task._id} className="bg-blue-100 p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow group cursor-pointer" onClick={(e) => handleCardClick(e, task._id)}>
                        <div className="flex justify-between items-start mb-4">

                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                task.status === 'completed' ? 'bg-green-50 text-green-600' : 'bg-blue-50 text-blue-600'
                            }`}>
                                {task.status}
                            </span>

                            {/* edit delete buttons */}
                            <div className="dropdown dropdown-end">
                              <div tabIndex={0} role="button" className="btn btn-ghost btn-sm text-xl text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors m-1"> <HiOutlineDotsHorizontal /> </div>
                              <ul tabIndex={0} className="dropdown-content menu bg-blue-50 rounded-xl z-[1] w-16 p-1.5 shadow-xl border border-slate-100 pt-1">
                                <li className='tooltip tooltip-right' data-tip="Edit" onClick={(e) => openEditModal(e, task)}> <FiEdit3 className='text-green-500 text-3xl p-1 ml-3'/> </li>
                                <li className='tooltip tooltip-right' data-tip="Delete" onClick={(e) => handleDeleteTask(e, task._id)}><MdDeleteOutline className='text-red-500 text-3xl p-1 ml-3' /></li>
                              </ul>
                            </div>

                        </div>

                        <h3 className="text-lg font-bold text-slate-800 mb-2">{task.title}</h3>
                        <p className="text-slate-500 text-sm line-clamp-2">
                          {task.description.split(" ").slice(0, 5).join(" ")}
                          {task.description.split(" ").length > 5 ? "..." : ""}
                        </p>

                        <div className="no-nav mt-6 pt-4 border-t border-slate-50 flex justify-between items-center cursor-default">
                            <span className="text-xs text-slate-400 font-medium">Due: {task.dueDate
                              ? new Date(task.dueDate).toLocaleDateString('en-US',{
                                month: 'short', 
                                day: 'numeric', 
                                year: 'numeric'
                              })
                            : 'No date'}</span>
                            <input type="checkbox" className="checkbox checkbox-success checkbox-sm rounded-md mr-5" checked={task.isComplete} onChange={(e) => handleToggleComplete(e, task._id)}/>
                        </div>

                    </div>
                ))}
            </div>
          )}
      </main>

      <AddTask fetchTasks={fetchTask}/>
      {selectedTask && (
        <EditTask
          task={selectedTask}
          tasks={tasks}
          setTasks={setTasks}
        />
      )}

      <div className='mt-16'>
        <Footer/>
      </div>

    </div>
  )
}

export default Tasks