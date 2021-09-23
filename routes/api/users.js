const express = require('express')
const router = express.Router()

const {tokenCheck, imageUploader} = require("../../middlewares");
const ctrl = require('../controlls/usersCtrl');

router.get('/current', tokenCheck, ctrl.getUser);

router.get('/verify/:verificationToken', ctrl.emailConfirmation);

router.post('/login', ctrl.login);

router.post('/verify', ctrl.resendVerificationEmail);

router.post('/logout', tokenCheck, ctrl.logout);

router.post('/signup', ctrl.signup);

router.patch('/', tokenCheck, ctrl.updateSubscription);

router.patch('/avatars', tokenCheck, imageUploader.single("avatar"), ctrl.updateAvatar);

module.exports = router