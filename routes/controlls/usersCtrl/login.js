const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require('dotenv').config();

const apiFunctions = require('../../../model/users');
const schemas = require('../../../joiSchemas/userJoiScheme');

const {SECRET_WORD} = process.env;

const login = async (req, res, next) => {
    try {
        const body = req.body;
        const {email, password} = body;

        const registeredUser = await apiFunctions.getByEmail(email);

        if (!registeredUser){
            return res.status(400).json({
                message: "This email isn't registered.",
            });
        }

        const {error} = schemas.signupScheme.validate(body);

        if (error){
            return res.status(400).json({
                message: "Validation error: email or password does't match the requirements.",
            });
        };

        const id = registeredUser._id;
        const isPasswordMatch = bcrypt.compareSync(password, registeredUser.password);

        if (!isPasswordMatch){
            return res.status(400).json({
                message: "Wrong password.",
            });
        }

        const payload = {
            id,
        };
        const token = jwt.sign(payload, SECRET_WORD);
        registeredUser.token = token;
        
        await apiFunctions.updateUser(id, registeredUser);

        return res.json({
            status: "Login success.",
            code: 200,
            token,
        })
    } catch (error) {
        next(error)
    }
} 

module.exports = login;