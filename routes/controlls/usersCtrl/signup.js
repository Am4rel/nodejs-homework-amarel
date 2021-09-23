const bcrypt = require("bcryptjs");
const gravatar = require('gravatar');
const path = require("path");
const fs = require("fs/promises");
const {v4} = require("uuid");

const apiFunctions = require('../../../model/users');
const schemas = require('../../../joiSchemas/userJoiScheme');
const {sendEmail} = require("../../../utils");

const avatarDir = path.join(__dirname, "../../../", "public/avatars");

const signup = async (req, res, next) => {
    try {
        const body = req.body;
        const {error} = schemas.signupScheme.validate(body);

        if (error){
            return res.status(400).json({
                message: "Validation error: email or password does't match the requirements.",
            });
        };

        const {email, password, subscription} = req.body;
        const registeredUser = await apiFunctions.getByEmail(email);

        if (registeredUser){
            return res.status(409).json({
                message: "Email is already registered. Try to log in.",
            });
        }

        const cryptedPass = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
        const image = gravatar.url(email, {s: "200"}, true);
        const verifyToken = v4();
        const userData = {email, password: cryptedPass, avatarURL: image, subscription, verifyToken};

        sendEmail(email, verifyToken);

        const {email: userEmail, _id: userId, subscription: userSub, avatarURL} = await apiFunctions.signup(userData);
        
        const userDirPath = path.join(avatarDir, userId.toString());
        await fs.mkdir(userDirPath);
        
        return res.status(201).json({
            status: "Signup success, user registered, verification email sent.",
            code: 201,
            data: {userId, userEmail, userSub, avatarURL},
        })
    } catch (error) {
        next(error)
    }
} 

module.exports = signup;