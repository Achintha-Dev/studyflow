import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const EditTask = ({ task, tasks, setTasks }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    dueDate: ''
  });

  // Load task data into the form when the task prop changes
  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || '',
        description: task.description || '',
        priority: task.priority || 'medium',
        dueDate: task.dueDate ? task.dueDate.split('T')[0] : '' 
      });
    }
  }, [task]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!task || !task._id) {
      toast.error("Invalid task!");
      return;
    }

    setLoading(true);
    try {
      const token = JSON.parse(localStorage.getItem('userInfo')).token;
      const res = await axios.put(`http://localhost:5000/api/tasks/${task._id}`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      // Update the specific task in the parent state
      if (Array.isArray(tasks)) {
        // For Tasks.jsx (list page)
        setTasks(tasks.map(t => 
          t._id === task._id ? res.data.task : t
        ));
      } else {
        // For TaskDetails.jsx (single task page)
        setTasks(res.data.task);
      }
      
      toast.success('Task updated successfully!');
      document.getElementById('edit_task_modal').close();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Update failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <dialog id="edit_task_modal" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box bg-white rounded-3xl p-6 md:p-10 shadow-2xl">
        <h3 className="font-black text-2xl text-slate-900 mb-6">Edit Task</h3>
        
        <form onSubmit={handleUpdate} className="space-y-4">
          <div className="form-control">
            <label htmlFor='title' className="label-text font-bold text-slate-600 mb-2" id='title-label'>Title</label>
            <input id='title'
              type="text" 
              className="input input-bordered rounded-xl bg-slate-50 focus:outline-blue-500" 
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              required
            />
          </div>

          <div className="form-control">
            <label htmlFor='description' className="label-text font-bold text-slate-600 mb-2" id='description-label'>Description</label>
            <textarea 
              className="textarea textarea-bordered h-24 rounded-xl bg-slate-50"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              id='description'
            ></textarea>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="form-control">
              <label htmlFor='priority' className="label-text font-bold text-slate-600 mb-2" id='priority-label'>Priority</label>
              <select 
                className="select select-bordered rounded-xl bg-slate-50"
                value={formData.priority}
                onChange={(e) => setFormData({...formData, priority: e.target.value})}
                id='priority'
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div className="form-control">
              <label htmlFor='due-date' className="label-text font-bold text-slate-600 mb-2" id='due-date-label'>Due Date</label>
              <input 
                type="date" 
                className="input input-bordered rounded-xl bg-slate-50 accent-blue-600 w-full" 
                style={{ colorScheme: 'light' }} 
                value={formData.dueDate}
                onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
                id='due-date'
              />
            </div>
          </div>

          <div className="modal-action mt-8">
            <button type="button" className="btn btn-ghost rounded-xl" onClick={() => document.getElementById('edit_task_modal').close()}>Cancel</button>
            <button type="submit" disabled={loading} className="btn bg-blue-600 text-white border-none rounded-xl px-10">
              {loading ? <span className="loading loading-spinner"></span> : 'Update Task'}
            </button>
          </div>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop"><button>close</button></form>
    </dialog>
  );
};

export default EditTask;