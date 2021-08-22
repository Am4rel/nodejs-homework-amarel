const apiFunctions = require('../../model');

const getById = async (req, res, next) => {
    try {
        const {contactId} = req.params;
        const contact = await apiFunctions.getContactById(contactId);

        if (!contact){
            return res.status(404).json({
                message: `Contact with id ${contactId} not found.`
            });
        }

        res.json({
            message: "Success",
            data: contact
        });
    } catch (error) {
        next(error);
    }
  };

  module.exports = getById;