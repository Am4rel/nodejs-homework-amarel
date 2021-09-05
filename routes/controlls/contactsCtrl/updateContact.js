const apiFunctions = require('../../../model/contacts');
const schemas = require('../../../joiSchemas/contactJoiScheme');

const updateContact = async (req, res, next) => {
    try {
      const {contactId} = req.params;
      const {body} = req;
      const validation = schemas.contactUpdateScheme.validate(body);

      if (!Object.keys(body).length){
        return res.status(400).json({
          message: `Error: at least one parameter (name, email or phone) should be provided.`
        });
      }

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

      const updatedContact = await apiFunctions.updateContactById(contactId, body);

      if (!updatedContact){
        return res.status(400).json({
          message: `Contact with id ${contactId} not found.`
        });
      }

      return res.json({
          message: `Contact with id ${contactId} updated.`,
          data: updatedContact
      });
    } catch (error) {
      next(error);
    }
  }

module.exports = updateContact;