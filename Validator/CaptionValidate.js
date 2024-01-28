const Joi = require('joi');

const CategoryCaptionValidate = Joi.object({
    title: Joi.string().trim().required().min(8).max(255).messages({
        'string.base': 'Title must be a string',
        'string.empty': 'Title cannot be empty',
        'string.min': 'Title should have a minimum length of {#limit}',
        'string.max': 'Title should have a maximum length of {#limit}',
        'any.required': 'Title is required',
    }),
    status: Joi.string().valid('show', 'hide').required().messages({
        'string.base': 'Status must be a string',
        'string.empty': 'Status cannot be empty',
        'any.only': 'Status must be one of "show" or "hide"',
    }),
});

const validateCategoryCaption = (data) => {

    const { error } = CategoryCaptionValidate.validate(data);

    if (error) {
        const errorMessage = error.details.map((detail) => detail.message).join(', ');
        return {
            message: errorMessage,
        };
    }

    return null; // Validation successful
};

module.exports = { validateCategoryCaption };
