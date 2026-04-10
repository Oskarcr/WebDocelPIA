const mongoose = require("mongoose");
const { Schema } = mongoose;

const furnitureSchema = new Schema({
    name: String,
    price: Number,
    color: Number,
    path: String,
    approximateTime: Number,
    description: String,
    finish: Number,
    manufacturingTime: Number
})

const Furniture = mongoose.model("Furniture", furnitureSchema);

module.exports = Furniture;