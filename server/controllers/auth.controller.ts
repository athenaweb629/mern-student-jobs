import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { OAuth2Client } from "google-auth-library";
import bcrypt from 'bcrypt';
import sgMail from '@sendgrid/mail';
import User from '../models/user.model';

export const loginController = (req: Request, res: Response) => {
    const { email, password } = req.body;

    User.findOne({ email }).then(user => {
        if(!user) return res.status(404).json({ message:"Incorrect credentials" });
        
        bcrypt.compare(password, user.hashed_password).then(isMatch => {
            if(isMatch){
                const payload = {
                    email,
                    password
                }

                const token = jwt.sign(payload, process.env.SECRET, { expiresIn: "30m" })

                res.cookie('token', token, { httpOnly: true });
                res.status(200).json({ message: 'Login successful', success: true, token });
            }else{
                return res.status(400).json({ message: "Incorrect credentials" });
            }
        });
    })
}

export const registerController = (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    User.findOne({ email }).then(user => {
        if(user) res.status(400).json({ email:"Email already exists" });
        else{
            const newUser = new User({
                email: email,
                name: name,
                hashed_password: password
            });

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(password, salt, (err, hash) => {
                    if(err) throw err;
                    newUser.hashed_password = hash;
                    newUser.salt = salt;
                    newUser.save()
                            .catch(err => console.log(err));
                });
            });
        }
    })

    const payload = {email, password}

    const token = jwt.sign(payload, process.env.SECRET, { expiresIn: '30m' });

    // const emailData = {
    //     from: process.env.EMAIL_FROM,
    //     to: email,
    //     subject: 'Account activation link',
    //     html: `
    //         <h1>Please use the following to activate your account</h1>
    //                 <p>${process.env.CLIENT_URL}/users/activate/${token}</p>
    //                 <hr />
    //                 <p>This email may containe sensetive information</p>
    //                 <p>${process.env.CLIENT_URL}</p>
    //     `
    // };

    // sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    // sgMail.send(emailData).then(sent => {
    //     console.log(`Email sent`);
    // }).catch(e => {
    //     console.log(e);
    // })

    return res.status(200).json({ message: "Registration successful" })

    
}
