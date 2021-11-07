/* eslint-disable no-console */
import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import connectDB from './helpers/connectDB';
import userRouter from './routes/user.route';

//* Setup Environment Variables
dotenv.config();

const { PORT } = process.env;
const app = express();

//* Connect DB
// connectDB();

//* Middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use(cookieParser());

//* Root Route
app.get('/', (req: Request, res: Response) => res.status(200).json({ status: 'Backend running.' }));

//* Use Routes
app.use('/api/user', userRouter);

//* 404 Route
app.use((req: Request, res: Response) => res.status(404).json({ status: 'Page not found.' }));

const startUp = (): void => {
  try {
    connectDB().then(() => {
      app.listen(PORT, () => console.log(`Backend listening on port ${PORT}`));
    });
  } catch (e) {
    console.log(e);
  }
};

startUp();
