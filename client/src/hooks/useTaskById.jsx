import API from "../services/Api";
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
const useTaskById = () => {
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const hasFetched = useRef(false);
  // fetch task by id
  useEffect(() => {
    if (!id || hasFetched.current) return;
    hasFetched.current = true;
    const fetchTask = async () => {
      try {
        setLoading(true);
        const token = JSON.parse(localStorage.getItem('userInfo')).token;
        const res = await API.get(`/tasks/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setTask(res.data);
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to load task!');
      } finally {
        setLoading(false);
      }
    };
    fetchTask();
  }, [id]);

  return { task, loading, setTask };

}

export default useTaskById
    
    
    

