import multer from "multer";
import Path from "path";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "attachments/");
    },

    filename: (req, file, cb) => {
        const fileName = Date.now() + "_" + file.originalname;
        cb(null, fileName);
    }
});

const uploader = multer({ storage });

Object.freeze(uploader);

export default uploader;