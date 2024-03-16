import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import todoRoutes from './routes/todos.js';

dotenv.config();
const app = express();

// Allow requests from the frontend origin (http://localhost:3000)
app.use(cors({ origin: 'http://localhost:3000' }));

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
    }
}

app.listen(8000, () => {
    connect();
    console.log('Server is running on port 8000');
});

app.use(express.json());
app.use('/api/todos', todoRoutes);
