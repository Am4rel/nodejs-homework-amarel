const apiFunctions = require('../../model');
const schemas = require('../../joiSchemas/contactJoiScheme');

const addContact = async (req, res, next) => {
    try {
        const body = req.body;
        const validation = schemas.contactAddScheme.validate(body);
        const newContact = await apiFunctions.addContact(body);

        if (validation.error){
            const errorMessage = validation.error.message;

            if (errorMessage.toString().includes("pattern")){
                const valueWithError = errorMessage.split('"')[1];
                return res.status(400).json({
                    message: `Error: bad request, check the ${valueWithError} field.`
                })
            }else{
                return res.status(400).json({
                    message: errorMessage
                })
            }
        };

        return res.json({
            message: 'Contact was succesfully added.',
            data: newContact
        })
    } catch (error) {
        next(error);
    }
}

module.exports = addContact;