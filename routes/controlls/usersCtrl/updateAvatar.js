const apiFunctions = require('../../../model/users');
const path = require("path");
const fs = require("fs/promises");
const jimp = require("jimp");

const updateAvatar = async (req, res, next) => {
    try {
        const {_id} = req.user;
        const {originalname, path: tempFile} = req.file;
        const avatarPath = path.join(__dirname, "../../../", `public/avatars/${_id.toString()}/${originalname}`);

        const file = await jimp.read(tempFile);
        await file.resize(250, 250).write(tempFile);

        await fs.rename(tempFile, avatarPath);

        const newAvatar = `avatars/${_id.toString()}/${originalname}`;

        await apiFunctions.updateUser(_id, {avatarURL: newAvatar});

        return res.json({
            status: "Success",
            code: 200,
            newAvatarURL: newAvatar,
        });
    } catch (error) {
        next(error);
    };
};

module.exports = updateAvatar;