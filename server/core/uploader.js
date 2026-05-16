import multer from "multer";

const storage = multer.memoryStorage();

const uploader = multer({ storage });

Object.freeze(uploader);

export default uploader;