import express, { Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';

import connectDB from './helpers/connectDB';
import userRouter from './routes/user.route';
import postRouter from './routes/post.route';

//* Setup Environment Variables
dotenv.config();

const { PORT } = process.env;
const app = express();

//* Middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use(cookieParser());

//* Root Route
app.get('/', (req: Request, res: Response) => res.status(200).json({ status: 'Backend running.' }));

//* Use Routes
app.use('/api/user', userRouter);
app.use('/api/post', postRouter);

//* 404 Route
app.use((req: Request, res: Response) => res.status(404).json({ status: 'Page not found.' }));

const initializeApp = async (): Promise<void> => {
  try {
    await connectDB();

    app.listen(PORT, () => console.log(`Backend listening on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

initializeApp();
