const Joi = require("joi");

const emailRegexp = new RegExp("^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$");

const signupScheme = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(3).required(),
    subscription: Joi.string(),
    avatarURL: Joi.string(),
    verify: Joi.boolean(),
    verifyToken: Joi.string(),
});

const loginScheme = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().required(),
});

const updateSubscriptionScheme = Joi.object({
    subscription: Joi.string().required(),
})

module.exports = {
    signupScheme,
    loginScheme,
    updateSubscriptionScheme
}