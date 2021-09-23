const {sendEmail} = require('../../../utils');
const apiFunctions = require('../../../model/users');

const resendVerificationEmail = async (req, res, next) => {
    try {
        const {email} = req.body;
        console.log(req.body)

        if (!email){
            return res.status(400).json({
                status: "Error",
                code: 400,
                message: "Missing required field email"
            });
        };

        const {verifyToken} = await apiFunctions.getByEmail(email);

        if (!verifyToken){
            return res.status(400).json({
                status: "Error",
                code: 400,
                message: "Verification has already been passed"
            });
        };

        sendEmail(email, verifyToken);

        return res.json({
            status: "Success",
            code: 200,
            message: "Verification email sent",
        });
    } catch (error) {
        next(error);
    };
};

module.exports = resendVerificationEmail;