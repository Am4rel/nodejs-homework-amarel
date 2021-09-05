const apiFunctions = require('../../../model/contacts');
const schemas = require('../../../joiSchemas/contactJoiScheme');

const addContact = async (req, res, next) => {
    try {
        const body = req.body;
        const {error} = schemas.contactAddScheme.validate(body);

        if (error){
            const {message} = error;
            return res.status(400).json({
                status: "Error",
                code: 400,
                message,
            })
        };

        const newContact = await apiFunctions.addContact(body);

        if (!newContact){
            return res.status(400).json({
                status: "Error",
                code: 400,
                message: 'This email is already registered',
            })
        }

        return res.json({
            message: 'Contact was succesfully added.',
            code: 201,
            data: newContact
        })
    } catch (error) {
        next(error);
    }
}

module.exports = addContact;