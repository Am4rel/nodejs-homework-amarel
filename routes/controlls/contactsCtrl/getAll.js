const apiFunctions = require('../../../model/contacts');

const getAll = async (req, res, next) => {
    try {
        const allContacts = await apiFunctions.listContacts();

        const {favorite} = req.query;
        let result;

        if (favorite){
            result = allContacts.filter(contact => contact.favorite.toString() === favorite);
        }else{
            result = allContacts;
        }

        res.json({
            message: "Success",
            code: 200,
            data: result
        })
    } catch (error) {
        next(error);
    }
  }

  module.exports = getAll;