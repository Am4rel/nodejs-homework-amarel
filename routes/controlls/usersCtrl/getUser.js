const getUser = async (req, res, next) => {
    try {
        const {_id: id, email, subscription} = req.user;

        const userData = {id, email, subscription};

        return res.json({
            status: "Success",
            code: 200,
            data: userData
        });
    } catch (error) {
        next(error);
    };
}

module.exports = getUser;