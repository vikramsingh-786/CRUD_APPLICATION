const { body, validationResult } = require('express-validator');

exports.validateRegister = [
  body('name').trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
  body('email').isEmail().normalizeEmail().withMessage('Invalid email address'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
];

exports.validateLogin = [
  body('email').isEmail().normalizeEmail().withMessage('Invalid email address'),
  body('password').exists().withMessage('Password is required'),
];

exports.validateTaskCreate = [
  body('title').trim().isLength({ min: 1, max: 200 }).withMessage('Title must be 1-200 characters'),
  body('description').optional().trim().isLength({ max: 1000 }).withMessage('Description too long'),
];

exports.validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: 'Validation failed',
      errors: errors.array().map(err => ({ field: err.path, msg: err.msg }))
    });
  }
  next();
};