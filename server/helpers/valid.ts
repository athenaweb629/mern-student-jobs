import { check } from 'express-validator';

export const validSignUp = [
  check('name')
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 4 }).withMessage('Name must contain at least 4 characters'),

  check('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Must be a valid email address'),

  check('password', 'Password is required')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password must contain at least 6 characters')
    .matches(/\d/).withMessage('Password must contain a number'),
];

export const validLogin = [
  check('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Must be a valid email address'),

  check('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password must contain at least 6 characters')
    .matches(/\d/).withMessage('Password must contain a number'),
];

export const forgotPasswordValidator = [
  check('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Must be a valid email address'),
];

export const resetPasswordValidator = [
  check('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password must contain at least 6 characters')
    .matches(/\d/).withMessage('Password must contain a number'),
];
