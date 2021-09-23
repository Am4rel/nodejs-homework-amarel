const signup = require("./signup");
const login = require("./login");
const logout = require("./logout");
const getUser = require("./getUser");
const updateSubscription = require("./updateSubscription");
const updateAvatar = require("./updateAvatar");
const emailConfirmation = require("./emaifConfirmation");
const resendVerificationEmail = require("./resendVerificationEmail");

module.exports = {
    signup,
    login,
    logout,
    getUser,
    updateSubscription,
    updateAvatar,
    emailConfirmation,
    resendVerificationEmail,
}