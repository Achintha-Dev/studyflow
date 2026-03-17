import mongoose from 'mongoose'

const taskSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    priority: {
        type: String,
        enum: ['Low', 'Medium', 'High'],
        default: 'Medium',
        set: (val) => {
            if (!val) return val;
            return val.charAt(0).toUpperCase() + val.slice(1); 
        } // fro case sensitivity when get input from user
    },
    dueDate: { type: Date},
    isComplete: { type: Boolean, default: false }

}, {timestamps: true});

const Task = mongoose.model('Task', taskSchema);

export default Task;