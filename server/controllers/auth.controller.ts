/* eslint-disable no-console */
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
// import { OAuth2Client } from 'google-auth-library';
import bcrypt from 'bcrypt';
import sgMail from '@sendgrid/mail';
import User from '../models/user.model';

export const loginController = (req: Request, res: Response) => {
  const { email, password } = req.body;

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

    return res.status(500);
  });
};

export const registerController = (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  User.findOne({ email }).then((user) => {
    if (user) res.status(400).json({ email: 'Email already exists' });
    else {
      const newUser = new User({
        email,
        name,
        hashed_password: password,
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (_error, hash) => {
          if (err) throw err;
          newUser.hashed_password = hash;
          newUser.salt = salt;
          newUser.save()
            // eslint-disable-next-line no-console
            .catch((e) => console.log(e));
        });
      });
    }
  });

  const payload = { email, password };

  const token = jwt.sign(payload, process.env.SECRET, { expiresIn: '30m' });

  const emailData = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: 'Account activation link',
    html: `
          <h1>Please use the following to activate your account</h1>
                  <p>${process.env.CLIENT_URL}/users/activate/${token}</p>
                  <hr />
                  <p>This email may containe sensetive information</p>
                  <p>${process.env.CLIENT_URL}</p>
      `,
  };

  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  sgMail.send(emailData).then(() => {
    console.log('Email sent');
  }).catch((e) => {
    console.log(e);
  });

  return res.status(200).json({ message: 'Registration successful' });
};

export const confirmUser = (req: Request, res: Response) => {
  const { token } = req.params;
  console.log(`token jebeni ---> ${token}`);
  try {
    jwt.verify(token, process.env.SECRET);
  } catch (e) {
    return res.status(400).json({ e });
  }

  User.updateOne({ token }, { confirmed: true }).then(() => {
    console.log('User confirmed');
    return res.status(200).json({ message: 'User confirmed' });
  });

  return res.status(400);
};

export const resendEmail = (req: Request, res: Response) => {
  const { email } = req.body;

  User.findOne({ email }).then((user) => {
    if (!user) return res.status(400).json({ message: 'User does not exist' });

    const payload = { email };

    const token = jwt.sign(payload, process.env.SECRET, { expiresIn: '30m' });

    const emailData = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: 'Account activation link',
      html: `
          <h1>Please use the following to activate your account</h1>
                  <p>${process.env.CLIENT_URL}/users/activate/${token}</p>
                  <hr />
                  <p>This email may containe sensetive information</p>
                  <p>${process.env.CLIENT_URL}</p>
      `,
    };

    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    sgMail.send(emailData).then(() => {
      console.log('Email sent');
    }).catch((e) => {
      console.log(e);
    });

    return res.status(200).json({ message: 'Reconfirmation mail sent' });
  });

  return res.status(500);
};
