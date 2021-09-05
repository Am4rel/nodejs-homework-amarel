const apiFunctions = require('../../../model/contacts');

const deleteContact = async (req, res, next) => {
    try {
        const {contactId} = req.params;
        const deletedContact = await apiFunctions.removeContactById(contactId);

        if (!deletedContact){
            return res.status(404).json({
                status: "Error",
                code: 404,
                message: `Contact with id ${contactId} not found.`
            })
        };

        return res.json({
            status: "Success",
            code: 200,
            message: `Contact with id ${contactId} succesfully deleted.`,
            data: deletedContact
        })
    } catch (error) {
        next(error);
    }
  }

  module.exports = deleteContact;