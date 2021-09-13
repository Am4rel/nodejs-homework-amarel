const apiFunctions = require('../../../model/contacts');
const schemas = require('../../../joiSchemas/contactJoiScheme');

const updateFav = async (req, res, next) => {
    try {
      const {contactId} = req.params;
      const {body} = req;
      
      const {error} = schemas.updateFavoriteScheme.validate(body);

      if (error){
        const errorMessage = error.details[0].message;
        return res.status(400).json({
            message: errorMessage
        })
    };

      const updatedContact = await apiFunctions.updateFav(contactId, body);

      if (!updatedContact){
        return res.status(400).json({
          message: `Contact with id ${contactId} not found.`
        });
      };

      return res.json({
          message: `Favorite status for contact with id ${contactId} updated.`,
          data: updatedContact
      });
    } catch (error) {
      next(error);
    }
  }

module.exports = updateFav;