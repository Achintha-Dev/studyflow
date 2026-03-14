import React, { useState } from "react";

function TaskForm({ onSubmit, initialData = {} }) {

  const [title, setTitle] = useState(initialData.title || "");
  const [description, setDescription] = useState(initialData.description || "");
  const [dueDate, setDueDate] = useState(
    initialData.dueDate ? initialData.dueDate.split("T")[0] : ""
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      title,
      description,
      dueDate
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">

      <div>
        <label className="text-sm font-medium">Title</label>
        <input
          type="text"
          className="input input-bordered w-full"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="text-sm font-medium">Description</label>
        <textarea
          className="textarea textarea-bordered w-full"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div>
        <label className="text-sm font-medium">Due Date</label>
        <input
          type="date"
          className="input input-bordered w-full"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>

      <button
        type="submit"
        className="btn bg-blue-600 hover:bg-blue-700 text-white w-full"
      >
        Save Task
      </button>

    </form>
  );
}

export default TaskForm;