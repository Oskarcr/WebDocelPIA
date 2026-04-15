const mongoose = require("mongoose");
const { Schema } = mongoose;

const colorSchema = new Schema({
    name: String,
    basePrice: Number,
    referenceHex: Number,
});

const Color = mongoose.model("Color", colorSchema);

module.exports = Color;