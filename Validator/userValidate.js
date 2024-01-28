
const Joi = require('joi');

const userValidator = Joi.object({
   
    email: Joi.string().trim().email().required().messages({
        'string.base': 'Email must be a string',
        'string.empty': 'Email cannot be empty',
        'string.min': 'Email should have a minimum length of {#limit}',
        'string.max': 'Email should have a maximum length of {#limit}',
        'any.required': 'Email is required',
    }),
    password: Joi.string().trim().required().messages({
        'string.base': 'Password must be a string',
        'string.empty': 'Password cannot be empty',
        'any.required': 'Password is required',
    }),
});


const validateLogin = (user) => {
    const { error } = userValidator.validate(user);

  
    if (error) {
      const errorMessage = error.details.map((detail) => detail.message).join(', ');
      return {
        message: errorMessage,
      };
    }
  
    return null; // Validation successful
  };

module.exports = { validateLogin }