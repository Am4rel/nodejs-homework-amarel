const express = require('express')
const ctrl = require('../controlls');
const router = express.Router()

router.get('/', ctrl.getAll);

router.get('/:contactId', ctrl.getById);

router.post('/', ctrl.add);

router.delete('/:contactId', ctrl.deleteById);

router.put('/:contactId/favorites', ctrl.updateFav);

router.put('/:contactId', ctrl.updateContact);

module.exports = router
