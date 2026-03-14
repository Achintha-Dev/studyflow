import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import TaskForm from "../components/TaskForm";

function EditTask() {

  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);

  useEffect(() => {

    const fetchTask = async () => {

      const token = JSON.parse(localStorage.getItem("userInfo")).token;

      const res = await axios.get(
        `http://localhost:5000/api/tasks/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setTask(res.data);

    };

    fetchTask();

  }, [id]);

  const handleUpdate = async (taskData) => {

    try {

      const token = JSON.parse(localStorage.getItem("userInfo")).token;

      await axios.put(
        `http://localhost:5000/api/tasks/${id}`,
        taskData,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      toast.success("Task updated!");
      navigate("/tasks");

    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update task");
    }

  };

  if (!task) return <p>Loading...</p>;

  return (
    <div className="min-h-screen flex justify-center items-center bg-slate-50">

      <div className="bg-white p-8 rounded-xl shadow w-[500px]">

        <h1 className="text-2xl font-bold mb-6">Edit Task</h1>

        <TaskForm initialData={task} onSubmit={handleUpdate} />

      </div>

    </div>
  );
}

export default EditTask;