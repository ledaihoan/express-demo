const Joi = require('joi');

module.exports = {
  passwordValidationSchema: Joi.string()
    .min(8)
    .pattern(new RegExp('^[a-zA-Z]')) // Starts with an alphabet character
    .pattern(new RegExp('[A-Z]')) // Contains at least one uppercase letter
    .pattern(new RegExp('[0-9]')) // Contains at least one number
    .pattern(new RegExp('[^a-zA-Z0-9]')) // Contains at least one special character
    .pattern(new RegExp('^[^\\s]*$')) // No spaces
    .required()
};
