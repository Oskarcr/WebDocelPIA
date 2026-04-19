import { Schema, model } from "mongoose";

const colorSchema = new Schema({
    name: String,
    basePrice: Number,
    referenceHex: Number,
});

const Color = model("Color", colorSchema);

export default Color;