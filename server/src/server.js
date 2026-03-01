import dns from 'dns'
dns.setServers(['8.8.8.8', '1.1.1.1']);

import dotenv from 'dotenv'
dotenv.config();

import express from 'express'
import cors from 'cors'
import connectDb from './config/db.js';
import {rateLimiter} from './middlewares/rateLimiter.js'
import authRoutes from './routes/authRoutes.js'
import router from './routes/tasksRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({origin: 'http://localhost:5173'})); // use connect to frontend
app.use(express.json()); // allow to read json data.

app.use(rateLimiter);

app.use('/api/auth', authRoutes);
app.use('/api/tasks', router);

connectDb().then(() => {
    app.listen(PORT, ()=>{
        console.log(`Server started on PORT: ${PORT}`);
    });
});