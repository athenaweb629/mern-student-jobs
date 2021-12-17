import { Request, Response } from 'express';
import { randomUUID } from 'crypto';

import Post from '../models/post.model';

export const getPosts = async (req: Request, res: Response) => {
  const posts = await Post.find({});

  res.json({ posts });
};

export const createPost = (req: Request, res: Response) => {
  const { title, description, level, availability, author } = req.body;
  const postID = randomUUID();
  const newPost = new Post({ postID, title, description, level, availability, author });

  newPost.save();

  res.status(200).json({ message: 'Post submitted' });
};

export const deletePost = async (req: Request, res: Response) => {
  const { id } = req.body;
  try {
    await Post.deleteOne({ id });
    return res.json({ message: 'Post deleted' });
  } catch (e) {
    return res.status(500).json(e);
  }
};

export const updatePost = async (req: Request, res: Response) => {
  const { id, newTitle, newDescription, newLevel, newAvailability } = req.body;
  try {
    await Post.updateOne({ id }, {
      $set:
        { title: newTitle,
          description: newDescription,
          level: newLevel,
          availability: newAvailability
        }
    });
    return res.json({ message: 'Post updated' });
  } catch (e) {
    return res.status(500).json(e);
  }
};
