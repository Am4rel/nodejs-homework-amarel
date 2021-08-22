const getAll = require('./getAll');
const getById = require('./getById')
const add = require('./addContact');
const deleteById = require('./deleteContact');
const updateContact = require('./updateContact');

module.exports = {
    getAll,
    getById,
    add,
    deleteById,
    updateContact
}