import { Schema, model } from "mongoose";

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

const Furniture = model("Furniture", furnitureSchema);

export default Furniture;