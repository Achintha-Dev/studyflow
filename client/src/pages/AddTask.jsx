import React, { useState } from 'react';
import API from '../services/Api';
import toast from 'react-hot-toast';

const AddTask = ({ fetchTasks }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    dueDate: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title) return toast.error('Title is required');

    setLoading(true);
    try {
      const token = JSON.parse(localStorage.getItem('userInfo')).token;
      await API.post('/tasks', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      // Update Parent UI instantly
      await fetchTasks();
      
      toast.success('Task created successfully!');
      
      // Close modal and reset form
      document.getElementById('add_task_modal').close();
      setFormData({ title: '', description: '', priority: 'medium', dueDate: '' });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Could not save task');
    } finally {
      setLoading(false);
    }
  };

  return (
    <dialog id="add_task_modal" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box bg-white rounded-3xl p-6 md:p-10 shadow-2xl border border-slate-100">
        <h3 className="font-black text-2xl text-slate-900 mb-6 tracking-tight">New Study Task</h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title Input */}
          <div className="form-control w-full">
            <label htmlFor='title' className="label-text font-bold text-slate-600 mb-2" id='title-label'>Task Title</label>
            <input 
              type="text" 
              placeholder="e.g. Finish calculus problems" 
              className="input input-bordered w-full rounded-xl bg-slate-50 border-slate-200 focus:outline-blue-500" 
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              id='title'
            />
          </div>

          {/* Description */}
          <div className="form-control w-full">
            <label htmlFor='description' className="label-text font-bold text-slate-600 mb-2" id='description-label'>Description</label>
            <textarea 
              id='description'
              className="textarea textarea-bordered h-24 rounded-xl bg-slate-50 border-slate-200 focus:outline-blue-500" 
              placeholder="What needs to be done?"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            ></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Priority */}
            <div className="form-control w-full">
              <label htmlFor='priority' className="label-text font-bold text-slate-600 mb-2" id='priority-label'>Priority</label>
              <select 
                className="select select-bordered rounded-xl bg-slate-50 border-slate-200"
                value={formData.priority}
                onChange={(e) => setFormData({...formData, priority: e.target.value})}
                id='priority'
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
              </select>
            </div>

            {/* Due Date */}
            <div className="form-control w-full">
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

          <div className="modal-action mt-8 flex flex-col-reverse sm:flex-row gap-3">
            <button 
              type="button" 
              className="btn btn-ghost rounded-xl w-full sm:w-auto" 
              onClick={() => document.getElementById('add_task_modal').close()}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={loading}
              className="btn bg-blue-600 hover:bg-blue-700 text-white border-none rounded-xl px-10 shadow-lg shadow-blue-100 w-full sm:w-auto"
            >
              {loading ? <span className="loading loading-spinner text-info"></span> : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
      {/* Background click to close */}
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

export default AddTask;