const Joi = require('joi');
const { model } = require('mongoose');

const ProfileValidator = Joi.object({
    firstName: Joi.string().min(2).max(50).required(),
    lastName: Joi.string().min(2).max(50).required(),
    dateOfBirth: Joi.date().required(),
    gender: Joi.string().valid('male', 'female', 'other').required(),

})

module.exports = { ProfileValidator }