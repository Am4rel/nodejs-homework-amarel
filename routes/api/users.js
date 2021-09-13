const express = require('express')
const router = express.Router()

const {tokenCheck} = require("../../middlewares");
const ctrl = require('../controlls/usersCtrl');

router.post('/login', ctrl.login);

router.post('/logout', tokenCheck, ctrl.logout);

router.post('/signup', ctrl.signup);

router.get('/current', tokenCheck, ctrl.getUser);

router.patch('/', tokenCheck, ctrl.updateSubscription);

// router.put('/:contactId', ctrl.updateContact);

module.exports = router