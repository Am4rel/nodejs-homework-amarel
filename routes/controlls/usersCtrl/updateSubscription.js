const apiFunctions = require('../../../model/users');

const updateSubscription = async (req, res, next) => {
    try {
        const {_id} = req.user;
        const {subscription} = req.body;

        if (!subscription) {
            return res.status(400).json({
                status: "Error",
                code: 400,
                message: "You need to provide a new subscription value."
            });
        }else if (subscription !== "starter" && subscription !== "pro" && subscription !== "business"){
            return res.status(400).json({
                status: "Error",
                code: 400,
                message: "Subscription value must be one of: starter, pro, business."
            });
        };

        await apiFunctions.updateUser(_id, {subscription});

        return res.json({
            status: "Success",
            code: 200,
            message: `Your subscription was successfully updated to ${subscription} type.`
        });
    } catch (error) {
        next(error);
    };
};

module.exports = updateSubscription;