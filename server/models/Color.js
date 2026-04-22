import { Schema, model } from "mongoose";

const colorSchema = new Schema({
    name: String,
    basePrice: Number,
    hexReference: Number,
});

const Color = model("Color", colorSchema);

export default Color;