const bcrypt = require("bcryptjs");

const apiFunctions = require('../../../model/users');
const schemas = require('../../../joiSchemas/userJoiScheme');


const signup = async (req, res, next) => {
    try {
        const body = req.body;
        const {error} = schemas.signupScheme.validate(body);

        if (error){
            return res.status(400).json({
                message: "Validation error: email or password does't match the requirements.",
            });
        };

        const {email, password} = req.body;
        const registeredUser = await apiFunctions.getByEmail(email);

        if (registeredUser){
            return res.status(409).json({
                message: "Email is already registered. Try to log in.",
            });
        }

        const cryptedPass = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
        const userData = {email, password: cryptedPass}

        const {email: userEmail, _id: userId, subscription: userSub} = await apiFunctions.signup(userData);
        return res.status(201).json({
            status: "Signup success, user registered.",
            code: 201,
            data: {userId, userEmail, userSub},
        })
    } catch (error) {
        next(error)
    }
} 

module.exports = signup;