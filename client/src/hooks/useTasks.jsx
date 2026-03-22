import { useEffect, useState, useCallback, useRef } from "react";
import API from "../services/Api";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const useTasks = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    const hasFetched = useRef(false);

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const token = userInfo ? userInfo.token : null;


    // get all tasks
    const fetchTasks = useCallback(async () => {
        if (!token) return;
        try {
            setLoading(true);
            const res = await API.get('/tasks',{
                headers: { Authorization: `Bearer ${token}` }
            });
            setTasks(res.data);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to load tasks!');
        } finally {
            setLoading(false);
        }
    }, [token]);
    
    useEffect(() => {
        if (!token || hasFetched.current) return;

        hasFetched.current = true;
        fetchTasks();
    }, [fetchTasks, token]);



    
    // check/uncheck task
    const handleToggleComplete = async (e, id) => {
        e.stopPropagation(); // Prevent card click
        try {
        const task = tasks.find(t => t._id === id);

        const res = await API.put(`/tasks/${id}`, 
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
    }, [selectedTask]);



    // delete task
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
        await API.delete(`/tasks/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });

        toast.success("Task deleted!");

        // update UI instantly
        setTasks((prev) => prev.filter((task) => task._id !== id));

        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to delete task!');
        }

    }

    return { tasks, setTasks, loading, fetchTasks, handleToggleComplete, handleDeleteTask, openEditModal, selectedTask, userInfo };
};

export default useTasks;