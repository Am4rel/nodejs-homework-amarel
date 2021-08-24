const apiFunctions = require('../../model');

const getAll = async (_, res, next) => {
    try {
        const allContacts = await apiFunctions.listContacts();
        res.json({
            message: "success",
            data: allContacts
        })
    } catch (error) {
        next(error);
    }
  }

  module.exports = getAll;