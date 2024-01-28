
const Joi = require('joi');

const AuthValidator = Joi.object({

  email: Joi.string().trim().required().email().messages({
    'string.base': `Email must be a string`,
    'string.empty': `Email cannot be empty`,
    'string.email': `Email must be a valid email address`,
    'any.required': `Email is required`,
  }),
  name: Joi.string().trim().required().messages({
    'string.base': `Name must be a string`,
    'string.empty': `Name cannot be empty`,
    // 'string.min': `Name should have a minimum length of {#limit}`,
    // 'string.max': `Name should have a maximum length of {#limit}`,
    'any.required': `Name is required`,
  }),
  password: Joi.string().required().min(8).messages({
    'number.base': `Password must be a string`,
    'number.empty': `Password cannot be empty`,
    'any.required': `Password is required`,
    'string.min': `Name should have a minimum length of {#limit}`,
  }),
  userType: Joi.string().valid('user').required().messages({
    'string.base': 'User Type must be a string',
    'string.empty': 'User Type cannot be empty',
    'any.only': 'User Type must be one of "user", or "guest"',
  })

});

module.exports = { AuthValidator }


