const multer = require('multer');
const mongoose = require("mongoose");
const { GridFsStorage } = require('multer-gridfs-storage');

const keys = require('../config/keys');

const db = mongoose.connect(keys.MONGOdb_ACCESS);

const storage = new GridFsStorage({
    db,
    options: { 
        useNewUrlParser: true, useUnifiedTopology: true
    },
    file: (req, file) => {
        const mimetype = ["image/png", "image/jpeg"];

        if(mimetype.indexOf(file.mimetype) === -1) {
            const filename = `${Date.now()}-any-name-${file.originalname}`;

            return filename;
        }

        return {
            bucketName: "photos",
            filename: `${Date.now()}-any-name-${file.originalname}`,
        };
    }
});

module.exports = multer({ storage });