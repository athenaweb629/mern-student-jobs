import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import jwtDecode from 'jwt-decode';

import sendMail from '../helpers/sendMail';
import User from '../models/user.model';

export const loginController = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const err = validationResult(req);

  if (!err.isEmpty()) return res.status(400).json(err);

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User with that e-mail doesn\'t exist' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch && user.confirmed === false) {
      return res.status(400).json({ message: 'Please confirm your account first' });
    }

    if (isMatch) {
      const { role } = user;
      const token = await jwt.sign({ email, role }, process.env.SECRET, { expiresIn: '1h' });

      return res.send({ email: user.email, name: user.name, role, token });
    }

    res.status(400).send({ message: 'Incorrect credentials' });
  } catch (error) {
    console.log(error);
    res.send({ message: error });
  }

  return res.status(500);
};

export const registerController = async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;

  // TODO: sada dobivas userType ovdje, iskoristi to da odredimo tip racuna.

  const err = validationResult(req);

  if (!err.isEmpty()) return res.status(400).json(err);

  try {
    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ email: 'User with that e-mail already exists' });
    }

    const newUser = new User({ email, name, password, role });

    bcrypt.genSalt(10, (error, salt) => {
      bcrypt.hash(password, salt, (_error, hash) => {
        if (error) throw error;

        newUser.password = hash;
        newUser.salt = salt;
        newUser.save();
      });
    });

    const token = jwt.sign({ email }, process.env.SECRET, { expiresIn: '1h' });

    sendMail('activate', email, token);

    return res.status(200).json({ message: 'Registration successful' });
  } catch (e) {
    return res.status(500).json(e);
  }
};

export const confirmUser = async (req: Request, res: Response) => {
  const { token } = req.params;

  try {
    await jwt.verify(token, process.env.SECRET);
  } catch (e) {
    return res.status(400).json(e);
  }

  const decoded: any = jwtDecode(token);
  const { email } = decoded;

  try {
    await User.updateOne({ email }, { $set: { confirmed: true } });

    res.status(200).json({ message: 'User confirmed' });
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const resendEmail = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ message: 'User does not exist' });

    const token = jwt.sign({ email }, process.env.SECRET, { expiresIn: '1h' });

    sendMail('activate', email, token);

    return res.status(200).json({ message: 'Reconfirmation mail sent' });
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;

  const err = validationResult(req);

  if (!err.isEmpty()) return res.status(400).json(err);

  const token = jwt.sign({ email }, process.env.SECRET, { expiresIn: '1h' });

  try {
    await User.updateOne({ email }, { $set: { resetPasswordToken: token } });

    sendMail('reset', email, token);

    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  const { password } = req.body;
  const { token } = req.params;
  let newPassword: any;
  let newSalt: any;

  const err = validationResult(req);
  if (!err.isEmpty()) return res.status(400).json(err);

  try {
    await jwt.verify(token, process.env.SECRET);

    bcrypt.genSalt(10, async (e, salt: string) => {
      bcrypt.hash(password, salt, async (_error, hash: string) => {
        if (e) throw e;
        newPassword = hash;
        newSalt = salt;

        await User.updateOne({ resetPasswordToken: token }, { $set: { password: newPassword, salt: newSalt, resetPasswordToken: '' } });
      });
    });

    return res.status(200).json({ message: 'Password has been reset' });
  } catch (e) {
    return res.status(400).json(e);
  }
};

export const doSomething = async (req: Request, res: Response) => {
  res.send({ message: 'Authenticated!' });
};
