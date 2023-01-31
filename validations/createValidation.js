const Joi = require("@hapi/joi");

validatedCreate = Joi.object({
    // userId: Joi.string(),
    nameCreator: Joi.string().min(6),
    phone: Joi.number().required(),
    email: Joi.string().min(6),
    job: Joi.string().min(6).required(),
    description: Joi.string().min(6).required(),
    location: Joi.string().max(25).required(),
});

module.exports.validatedCreate = validatedCreate;