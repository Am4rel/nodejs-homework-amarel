const express = require('express')
const ctrl = require('../controlls/contactsCtrl');
const {tokenCheck} = require("../../middlewares");
const router = express.Router()

router.get('/', tokenCheck, ctrl.getAll);

router.get('/:contactId', tokenCheck, ctrl.getById);

router.post('/', tokenCheck, ctrl.add);

router.delete('/:contactId', tokenCheck, ctrl.deleteById);

router.put('/:contactId/favorites', tokenCheck, ctrl.updateFav);

router.put('/:contactId', tokenCheck, ctrl.updateContact);

module.exports = router
