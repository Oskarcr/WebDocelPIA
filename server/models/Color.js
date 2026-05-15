import { Schema, model } from "mongoose";

const colorSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    hexReference: {
        type: String,
        required: true,
    },
    basePrice: {
        type: Number,
        default: 0,
    }
});

colorSchema.index({ hexReference: 1 }, { 
    unique: true 
});

const Color = model("Color", colorSchema);

export default Color;