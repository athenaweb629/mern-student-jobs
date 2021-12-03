import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const checkTokenExpiry = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization.split(' ')[1];

  try {
    jwt.verify(token, process.env.SECRET);
    next();
  } catch (e) {
    return res.status(400).json(e);
  }
};

export default checkTokenExpiry;
