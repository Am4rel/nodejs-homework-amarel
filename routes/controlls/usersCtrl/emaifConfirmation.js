const {User} = require('../../../model/schemas');

const emailConfirmation = async (req, res, next) => {
    try {
        const {verificationToken} = req.params;
        await User.findOneAndUpdate({verifyToken: verificationToken}, {verify: true, verifyToken: null});

        return res.json({
            status: "Success",
            code: 200,
            message: "Verification success",
        });
    } catch (error) {
        next(error);
    };
};

module.exports = emailConfirmation;
