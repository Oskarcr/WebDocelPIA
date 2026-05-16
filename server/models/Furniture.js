import { Schema, model } from "mongoose";

const furnitureSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
    },
    color: {
        type: Schema.Types.ObjectId,
        ref: "Color",
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    finish: {
        type: Number,
        required: true,
    },
    // Se dejan para despues
    active: {
        type: Boolean,
        default: true
    },
});

furnitureSchema.pre(/^find/, function() {
    this.populate("color", "-_id");
})

const Furniture = model("Furniture", furnitureSchema);

export default Furniture;