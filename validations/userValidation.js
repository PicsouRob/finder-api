const Joi = require("@hapi/joi");

// schema Validation
validatedRegister = Joi.object({
    name: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
    resetLink: Joi.string(),
    facebook: Joi.string(),
    instagram: Joi.string(),
    phone: Joi.number(),
    description: Joi.string(),
    location: Joi.string(),
    website: Joi.string(),
});

validateNewPass = Joi.object({ newPassword: Joi.string().min(6).required() });

validatedLogin = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required()
});

module.exports.validatedLogin = validatedLogin;
module.exports.validateNewPass = validateNewPass;
module.exports.validatedRegister = validatedRegister;