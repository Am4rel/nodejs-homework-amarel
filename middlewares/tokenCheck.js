const jwt = require("jsonwebtoken");
require("dotenv").config();

const {User} = require("../model/schemas");

const {SECRET_WORD} = process.env

const tokenCheck = async (req, res, next) => {
    const auth = req.headers.authorization;

    if (!auth){
        return res.status(401).json({
            status: "Unauthorized",
            code: 401,
            message: "Unauthorized: login or signup."
        }); 
    }

    const token = auth.split(" ")[1];
    
    try {
        const {id} = jwt.verify(token, SECRET_WORD);
        const user = await User.findById(id);
        
        if (!user || token !== user.token){
            return res.status(401).json({
                status: "Unauthorized",
                code: 401,
                message: "Unauthorized: login or signup."
            });
        }

        req.user = user;
        next();
    } catch (_) {
        return res.status(401).json({
            status: "Unauthorized",
            code: 401,
            message: "Unauthorized: login or signup."
        });
    };    
}

module.exports = tokenCheck;