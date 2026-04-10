const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
    username: String,
    email: String,
    password: String,
    address: String,
    phone: Number,
    role: Number,
});

const Usuario = mongoose.model("Usuario", userSchema);

module.exports = Usuario;