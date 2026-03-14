import React, { useEffect, useState, useContext } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'

import { AuthContext } from '../context/AuthContext';
import Navbar from '../components/Navbar'

import { IoLogOutOutline } from "react-icons/io5";
import { LuCircleUserRound } from "react-icons/lu";
import { FiEdit3 } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

function TaskDetails() {

   const { user, logout } = useContext(AuthContext);
   const name = JSON.parse(localStorage.getItem('userInfo'))?.user?.name || user?.name || 'User';
  const firstLetter = name.charAt(0).toUpperCase();
  const { id } = useParams()
  const [task, setTask] = useState(null)

  useEffect(() => {

    const fetchTask = async () => {
      try {

        const token = JSON.parse(localStorage.getItem('userInfo')).token

        const res = await axios.get(`http://localhost:5000/api/tasks/${id}`,{
          headers:{ Authorization:`Bearer ${token}` }
        })

        setTask(res.data)

      } catch (error) {
        console.log(error)
      }

    }

    fetchTask()

  }, [id])


  if(!task){
    return <p>Loading...</p>
  }

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
      <div className="min-h-screen flex justify-center items-center bg-slate-50">

        <div className="bg-white p-10 rounded-xl shadow-md w-[500px]">

          <h1 className="text-2xl font-bold mb-4">{task.title}</h1>

          <p className="text-gray-600 mb-4">{task.description}</p>

          <p className="text-sm text-gray-400">
            Status: {task.status}
          </p>

          <p className="text-sm text-gray-400">
            Due Date: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "No Date"}
          </p>

        </div>

      </div>
    </div>
  )
}

export default TaskDetails