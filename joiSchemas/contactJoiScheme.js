const Joi = require("joi");

const emailRegexp = new RegExp("^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$");
const phoneRegexp = new RegExp("^[(][0-9]{3}[)] [0-9]{3}[-][0-9]{4}$");

const contactAddScheme = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().pattern(emailRegexp).required(),
    phone: Joi.string().pattern(phoneRegexp).required(),
    favorite: Joi.boolean()
})

const contactUpdateScheme = Joi.object({
    name: Joi.string(),
    email: Joi.string().pattern(emailRegexp),
    phone: Joi.string().pattern(phoneRegexp),
    favorite: Joi.boolean()
})

const updateFavoriteScheme = Joi.object({
    favorite: Joi.boolean().required()
})

module.exports = {
    contactAddScheme,
    contactUpdateScheme,
    updateFavoriteScheme
}