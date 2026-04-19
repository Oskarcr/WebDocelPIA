import { Schema, model } from "mongoose";

const userSchema = new Schema({
    username: String,
    email: String,
    password: String,
    address: String,
    phone: Number,
    role: Number,
});

const Usuario = model("Usuario", userSchema);

export default Usuario;