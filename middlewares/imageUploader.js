const multer = require("multer");
const path = require("path");

const tempDir = path.join(__dirname, "../", "temp");

const multerConfig = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, tempDir);
    },
    filename: (req, file, cb) =>{
        cb(null, file.originalname);
    },
    limits: {
        fileSize: 1024
    },
});

const imageUploader = multer({
    storage: multerConfig,
});

module.exports = imageUploader;