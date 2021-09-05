const {User} = require("../schemas")

const signup = async (userObj) =>{
    const user = await User.create(userObj);

    return user;
}

const getByEmail = async (email) => {
    const user = await User.findOne({email});
    return user;
}

const updateUser = async (id, updateObj) => {
    const result = await User.findByIdAndUpdate(id, updateObj);

    return result;
}

module.exports = {
    signup,
    getByEmail,
    updateUser,
}