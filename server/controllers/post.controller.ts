import { Request, Response } from 'express';

import Post from '../models/post.model';

export const createPost = (req: Request, res: Response) => {
  const { title, description, level, availability, author } = req.body;
  const newPost = new Post({ title, description, level, availability, author });

  newPost.save();

  res.status(200).json({ message: 'Post submitted' });
};

export const deletePost = (req: Request, res: Response) => {
  res.json({ message: 'aj prdni' });
};
