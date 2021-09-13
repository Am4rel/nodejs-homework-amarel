const apiFunctions = require('../../../model/users');

const logout = async (req, res, next) => {
    try {
        const {user} = req;

        user.token = null;

        await apiFunctions.updateUser(user._id, user);
        return res.status(204).json({});
    } catch (error) {
        next(error)
    }
}

module.exports = logout;