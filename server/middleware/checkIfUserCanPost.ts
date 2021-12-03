import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const checkIfUserCanPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    await jwt.verify(token);
    const data = jwt.decode(token);
    if (data.role === 'company') next();
    else return res.status(401).json({ message: 'Unauthorized' });
  } catch (e) {
    return res.json(e);
  }
};

export default checkIfUserCanPost;
