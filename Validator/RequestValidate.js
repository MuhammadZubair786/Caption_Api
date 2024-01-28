
const Joi = require('joi');

const requestValidator = Joi.object({

    requestType: Joi.string().valid('follow').required().messages({
        'string.base': 'requestType Type must be a string',
        'string.empty': 'requestType Type cannot be empty',
        'any.only': 'requestType Type only one "follow"',
    }),
    senderID: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required().messages({
        'string.base': 'senderID must be a string',
        'string.empty': 'senderID cannot be empty',
        'any.required': 'senderID is required',
        'string.pattern.base':  'Invalid Object Id "{{#label}}"'
    }),
    RecieverID: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required().messages({
        'string.base': 'RecieverID must be a string',
        'string.empty': 'RecieverID cannot be empty',
        'any.required': 'RecieverID is required',
        'string.pattern.base': 'Invalid Object Id "{{#label}}"'
    }),
    // RequestStatus: Joi.string().trim().required().messages({
    //     'string.base': 'RequestStatus must be a string',
    //     'string.empty': 'RequestStatus cannot be empty',
    //     'any.required': 'RequestStatus is required',
       
    // }),

});


const validaterequest = (user) => {
    const { error } = requestValidator.validate(user);


    if (error) {
        const errorMessage = error.details.map((detail) => detail.message).join(', ');
        return {
            message: errorMessage,
        };
    }

    return null; // Validation successful
};

module.exports = { validaterequest }