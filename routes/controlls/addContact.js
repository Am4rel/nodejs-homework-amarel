const apiFunctions = require('../../model');
const schemas = require('../../joiSchemas/contactJoiScheme');

const addContact = async (req, res, next) => {
    try {
        const body = req.body;
        const {error} = schemas.contactAddScheme.validate(body);

        if (error){
            const {message} = error;
            return res.status(400).json({
                message
            })
        };

        const newContact = await apiFunctions.addContact(body);

        return res.json({
            message: 'Contact was succesfully added.',
            data: newContact
        })
    } catch (error) {
        next(error);
    }
}

module.exports = addContact;