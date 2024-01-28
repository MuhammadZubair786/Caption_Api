
const Joi = require('joi');

const TicketValidator = Joi.object({

   
    admin_id: Joi.string().trim().required().messages({
        'string.base': 'Admin ID must be a string',
        'string.empty': 'Admin ID cannot be empty',
        'any.required': 'Admin ID is required',
    }),
    status: Joi.string().valid('requested', 'completed', 'pending').required().messages({
        'string.base': 'Status must be a string',
        'string.empty': 'Status cannot be empty',
        'any.only': 'Status must be one of "requested", "completed", or "pending"',
    }),
    title: Joi.string().trim().required().min(8).max(255).messages({
        'string.base': 'Title must be a string',
        'string.empty': 'Title cannot be empty',
        'string.min': 'Title should have a minimum length of {#limit}',
        'string.max': 'Title should have a maximum length of {#limit}',
        'any.required': 'Title is required',
    }),
    description: Joi.string().trim().required().messages({
        'string.base': 'Description must be a string',
        'string.empty': 'Description cannot be empty',
        'any.required': 'Description is required',
    }),
});


const validateTicket = (ticketData) => {
    // const { error } = TicketValidator.validate(ticketData,{ abortEarly: false });
    const { error } = TicketValidator.validate(ticketData);

  
    if (error) {
      const errorMessage = error.details.map((detail) => detail.message).join(', ');
      return {
        message: errorMessage,
      };
    }
  
    return null; // Validation successful
  };

module.exports = { validateTicket }