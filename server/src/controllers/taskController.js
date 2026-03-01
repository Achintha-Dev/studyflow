import Task from "../models/task.js";

export async function getAllTasks(req, res) {
    try {

        const tasks = await Task.find();
        return res.status(200).json(tasks);
        
    } catch (error) {
        console.log('error occurred:', error);
        return res.status(500).json({message: 'Internal server error!'});
    }
}

export async function getTaskById(req, res) {
    try {
        
        const tasks = await Task.findById(req.params.id);
        if(!tasks) return res.status(404).json({message: 'Task not found!'});

        return res.status(200).json(tasks);

    } catch (error) {
        console.log('error occurred:', error);
        return res.status(500).json({message: 'Internal server error!'});
    }
}

export async function createTask(req, res) {
    try {
        
        const { title, description, priority, dueDate, isComplete } = req.body;
        const newTask = new Task({
            user: req.user.id,
            title,
            description,
            priority,
            dueDate,
            isComplete
        });

        const saveTask = await newTask.save();
        return res.status(201).json({
            message: 'Task Created Successfully',
            task: { id: saveTask._id, title: saveTask.title, description: saveTask.description,}
        });

    } catch (error) {
        console.log('error occurred:', error);
        return res.status(500).json({message: 'Internal server error!'});
    }
}

export async function updateTask(req, res) {
    try {
        
        const updateTask = await Task.findOneAndUpdate(
            { _id: req.params.id, user: req.user.id },
            { priority: req.body.priority, isComplete: req.body.isComplete },
            { returnDocument: 'after' }
        );

        if(!updateTask) return res.status(404).json({ message: 'Task not found for update!' });

        return res.status(200).json(
            {
                message: 'Task Updated Successfully!',
                task: updateTask
            }
        );

    } catch (error) {
        console.log('error occurred:', error);
        return res.status(500).json({message: 'Internal server error!'});
    }
}

export async function deleteTask(req, res) {
    try {
        const task = await Task.findOneAndDelete(
            {
                _id: req.params.id,
                user: req.user.id
            }
        );
        if(!task) return res.status(404).json({message: 'Task not found'});
        return res.status(200).json({message: 'Task deleted successfully!'});

    } catch (error) {
        console.log('error occurred:', error);
        return res.status(500).json({message: 'Internal server error!'});
    }
}