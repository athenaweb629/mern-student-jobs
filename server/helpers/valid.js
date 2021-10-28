import { check } from 'express-validator';

export const validSign = [
  check('name', 'Name is required')
    .notEmpty()
    .isLength({ min: 4, max: 32 })
    .withMessage('name must be between 3 to 32 characters'),

  check('email')
    .isEmail()
    .withMessage('Must be a valid email address'),

  check('password', 'password is required')
    .notEmpty(),
    
  check('password')
    .isLength({ min: 6})
    .withMessage('Password must contain at least 6 characters').matches(/\d/).withMessage('password must contain a number')
]

export const validLogin = [
  check('email')
    .isEmail()
    .withMessage('Must be a valid email address'),

  check('password', 'password is required')
    .notEmpty(),

  check('password')
    .isLength({ min: 6})
    .withMessage('Password must contain at least 6 characters').matches(/\d/).withMessage('password must contain a number')
]


export const forgotPasswordValidator = [
  check('email')
    .not()
    .isEmpty()
    .isEmail()
    .withMessage('Must be a valid email address')
];

export const resetPasswordValidator = [
  check('newPassword')
    .not()
    .isEmpty()
    .isLength({ min: 6 })
    .withMessage('Password must be at least  6 characters long')
];