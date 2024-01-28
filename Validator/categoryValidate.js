const Joi = require('joi');

const categoryValidator = Joi.object({
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
    status: Joi.string().valid('show', 'hide').required().messages({
        'string.base': 'Status must be a string',
        'string.empty': 'Status cannot be empty',
        'any.only': 'Status must be one of "show" or "hide"',
    }),
    category_type:  Joi.string().valid('captions', 'subcategory').required().messages({
        'string.base': 'category_type must be a string',
        'string.empty': 'category_type cannot be empty',
        'any.only': 'category_type must be one of "captions" or "subcategory"',
    }),
});

const validateCategory = (ticketData) => {
    console.log(ticketData)
    const { error } = categoryValidator.validate(ticketData);

    if (error) {
        const errorMessage = error.details.map((detail) => detail.message).join(', ');
        return {
            message: errorMessage,
        };
    }

    return null; // Validation successful
};

module.exports = { validateCategory };
