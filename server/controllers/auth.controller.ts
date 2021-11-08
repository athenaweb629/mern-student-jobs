/* eslint-disable no-console */
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
// import { OAuth2Client } from 'google-auth-library';
import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator';
import jwtDecode from 'jwt-decode';
import sendMail from '../helpers/sendMail';
import User from '../models/user.model';

export const loginController = (req: Request, res: Response) => {
  const { email, password } = req.body;

  const err = validationResult(req);
  if (!err.isEmpty()) {
    console.log(err.mapped());
    return res.status(400).json(err);
  }

  // eslint-disable-next-line consistent-return
  User.findOne({ email }).then((user) => {
    if (!user) return res.status(404).json({ message: 'Incorrect credentials' });

    bcrypt.compare(password, user.hashed_password).then((isMatch) => {
      if (isMatch && user.confirmed === false) return res.status(400).json({ message: 'Please confirm your account first' });

      if (isMatch) {
        const payload = {
          email,
          password,
        };

        const token = jwt.sign(payload, process.env.SECRET, { expiresIn: '30m' });

        res.cookie('token', token, { httpOnly: true });
        return res.status(200).json({ message: 'Login successful', success: true, token });
      }

      return res.status(400).json({ message: 'Incorrect credentials' });
    });
  });

  return res.status(500);
};

// eslint-disable-next-line consistent-return
export const registerController = (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const err = validationResult(req);
  if (!err.isEmpty()) {
    return res.status(400).json(err);
  }

  try {
    // eslint-disable-next-line consistent-return
    User.findOne({ email }).then((user) => {
      if (user) res.status(400).json({ email: 'Email already exists' });
      else {
        const newUser = new User({
          email,
          name,
          hashed_password: password,
        });

        bcrypt.genSalt(10, (error, salt) => {
          bcrypt.hash(password, salt, (_error, hash) => {
            if (error) throw error;
            newUser.hashed_password = hash;
            newUser.salt = salt;
            newUser.save()
              // eslint-disable-next-line no-console
              .catch((e) => console.log(e));
          });
        });

        const payload = { email };
        const token = jwt.sign(payload, process.env.SECRET, { expiresIn: '30m' });
        sendMail('activate', email, token);

        return res.status(200).json({ message: 'Registration successful' });
      }
    });
  } catch (e) {
    return res.status(400).json(e);
  }

  // return res.status(400).json({ message: 'Registration failed, please try again' });
};

export const confirmUser = (req: Request, res: Response) => {
  const { token } = req.params;

  try {
    jwt.verify(token, process.env.SECRET);
  } catch (e) {
    return res.status(400).json(e);
  }

  const decoded: any = jwtDecode(token);
  const { email } = decoded;

  User.updateOne({ email }, { $set: { confirmed: true } }).then(() => res.status(200).json({ message: 'User confirmed' }));

  return res.status(400);
};

export const resendEmail = (req: Request, res: Response) => {
  const { email } = req.body;

  User.findOne({ email }).then((user) => {
    if (!user) return res.status(400).json({ message: 'User does not exist' });

    const payload = { email };
    const token = jwt.sign(payload, process.env.SECRET, { expiresIn: '30m' });
    sendMail('activate', email, token);

    return res.status(200).json({ message: 'Reconfirmation mail sent' });
  });

  return res.status(500);
};

export const forgotPassword = (req: Request, res: Response) => {
  const { email } = req.body;

  const err = validationResult(req);
  if (!err.isEmpty()) {
    return res.status(400).json(err);
  }

  const payload = { email };
  const token = jwt.sign(payload, process.env.SECRET, { expiresIn: '30m' });

  User.updateOne({ email }, { $set: { resetPasswordToken: token } });

  sendMail('reset', email, token);

  return res.status(200).json({ success: true });
};

// eslint-disable-next-line consistent-return
export const resetPassword = (req: Request, res: Response) => {
  const { password } = req.body;
  const { token } = req.params;

  const err = validationResult(req);
  if (!err.isEmpty()) {
    return res.status(400).json(err);
  }

  try {
    jwt.verify(token, process.env.SECRET);
    bcrypt.genSalt(10, (e, salt) => {
      bcrypt.hash(password, salt, (_error, hash) => {
        if (e) throw e;

        User.updateOne({ token }, {
          $set: {
            hashed_password: hash,
            salt,
            resetPasswordToken: '',
          },
        });

        return res.status(200).json({ message: 'Password has been reset' });
      });
    });
  } catch (e) {
    return res.status(400).json({ e });
  }
};
