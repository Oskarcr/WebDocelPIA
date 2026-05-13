import { Schema, model } from "mongoose";

const furnitureSchema = new Schema({
    name: String,
    price: Number,
    color: [{
        type: Schema.Types.ObjectId,
        ref: "Color"
    }],
    imageUrl: String,
    approximateTime: Number,
    description: String,
    finish: Number,
    manufacturingTime: Number
})

const Furniture = model("Furniture", furnitureSchema);

export default Furniture;