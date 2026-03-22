import React, { useContext } from 'react'
import { Link, useNavigate  } from 'react-router-dom'

import Navbar from '../components/Navbar'
import { AuthContext } from '../context/AuthContext';
import Footer from '../components/Footer';
import AddTask from './AddTask'
import EditTask from './EditTask';
import useTasks from '../hooks/useTasks';

import { IoLogOutOutline } from "react-icons/io5";
import { LuCircleUserRound } from "react-icons/lu";
import { FiEdit3 } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { HiOutlineDotsHorizontal } from "react-icons/hi";


function Tasks() {

  const { user, logout } = useContext(AuthContext);
  const { tasks, setTasks, loading, fetchTasks, handleToggleComplete, handleDeleteTask, openEditModal, selectedTask, userInfo } = useTasks();
  const navigate = useNavigate();

  const name = userInfo?.user?.name || user?.name || 'User';
  const firstLetter = name.charAt(0).toUpperCase();

  const handleCardClick = (e, id) => {
    // Prevent navigation if dropdown or checkbox is clicked
    if (e.target.closest('.dropdown, .no-nav') || e.target.type === 'checkbox') {
      return;
    }
    navigate(`/tasks/${id}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Nav bar */}
      <Navbar>
        
        <li className='text-blue-700 lg:hidden'><span> <LuCircleUserRound/>Hi! {name} </span></li>
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
            {tasks.length === 0 ? (

              // no tasks message
              <div className="col-span-full justify-center text-center py-20 text-gray-400 text-xl">
                No tasks yet. Click <a onClick={()=> document.getElementById('add_task_modal').showModal()} className="text-blue-500 hover:text-blue-700 cursor-pointer">"New Task"</a>  to create one
              </div>

            ): tasks.map((task) => ( 

              <div key={task._id} className="bg-blue-100 p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow group cursor-pointer" onClick={(e) => handleCardClick(e, task._id)}>

                <div className="flex justify-between items-start mb-4">
                  {/* status badge */}
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                    task.isComplete ? 'bg-green-100 text-green-600' : 'bg-blue-200 text-blue-600'
                  }`}>
                    {task.isComplete ? 'Completed' : 'In Progress'}
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

                {/* description */}
                <h3 className="text-lg font-bold text-slate-800 mb-2">{task.title}</h3>
                <p className="text-slate-500 text-sm line-clamp-2">
                  {task.description.split(" ").slice(0, 5).join(" ")}
                  {task.description.split(" ").length > 5 ? "..." : ""}
                </p>

                {/* due date and completion status */}
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

      <AddTask fetchTasks={fetchTasks}/>
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