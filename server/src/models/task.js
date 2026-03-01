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
        set: (v) => v.charAt(0).toUpperCase() + v.slice(1).toLowerCases() // fro case sensitivity when get input from user
    },
    dueDate: { type: Date},
    isComplete: { type: Boolean }

}, {timestamps: true});

const Task = mongoose.model('Task', taskSchema);

export default Task;