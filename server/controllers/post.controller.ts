import { Request, Response } from 'express';
import { randomUUID } from 'crypto';

import Post from '../models/post.model';
import User from '../models/user.model';

export const getPosts = async (req: Request, res: Response) => {
  const posts = await Post.find({});

  res.json({ posts });
};

export const createPost = async (req: Request, res: Response) => {
  const {
    title,
    description,
    qualificationLevel,
    availability,
    author,
    employeeLocation,
    skills
  } = req.body;

  const postID = randomUUID();
  await User.updateOne({ email: author }, { $push: { posts: postID } });

  const newPost = new Post({
    postID,
    title,
    description,
    qualificationLevel,
    availability,
    author,
    employeeLocation,
    skills
  });

  try {
    newPost.save();
    res.status(200).json({ message: 'Post submitted' });
  } catch (e) {
    res.status(500).json({ message: 'Post submission failed, please try again' });
  }
};

export const deletePost = async (req: Request, res: Response) => {
  const { postID } = req.body;
  try {
    await Post.deleteOne({ postID });
    return res.json({ message: 'Post deleted' });
  } catch (e) {
    return res.status(500).json(e);
  }
};

export const updatePost = async (req: Request, res: Response) => {
  const {
    postID,
    newTitle,
    newDescription,
    newQualificationLevel,
    newAvailability,
    newEmployeeLocation,
    newSkills
  } = req.body;
  try {
    await Post.updateOne({ postID }, {
      $set: {
        title: newTitle,
        description: newDescription,
        qualificationLevel: newQualificationLevel,
        availability: newAvailability,
        employeeLocation: newEmployeeLocation,
        skills: newSkills
      }
    });
    return res.json({ message: 'Post updated' });
  } catch (e) {
    return res.status(500).json({ message: 'Post submission failed, please try again' });
  }
};
