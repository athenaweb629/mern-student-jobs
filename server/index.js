import express from 'express';
import dotenv from 'dotenv'
import morgan from 'morgan';
import cors from 'cors';

import connectDB from './helpers/connectDB.js';
import userRouter from './routes/user.route.js';

//* Setup Environment Variables
dotenv.config();

const PORT = process.env.PORT;
const app = express();

//* Connect DB
connectDB();

//* Middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

//* Root Route
app.get('/', (req, res) =>  res.status(200).json({ status: 'Backend running.'}));

//* Use Routes
app.use('/api/user', userRouter)

//* 404 Route
app.use((req, res) => res.status(404).json({ status: "Page not found.." }));

app.listen((PORT), () => console.log(`App listening on port ${PORT}`));