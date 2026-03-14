import React from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import TaskForm from "../components/TaskForm";

function AddTask() {

  const navigate = useNavigate();

  const handleCreate = async (taskData) => {

    try {

      const token = JSON.parse(localStorage.getItem("userInfo")).token;

      await axios.post(
        "http://localhost:5000/api/tasks",
        taskData,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      toast.success("Task created!");
      navigate("/tasks");

    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create task");
    }

  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-slate-50">

      <div className="bg-white p-8 rounded-xl shadow w-[500px]">

        <h1 className="text-2xl font-bold mb-6">Create Task</h1>

        <TaskForm onSubmit={handleCreate} />

      </div>

    </div>
  );
}

export default AddTask;