import { Schema, model } from "mongoose";

const orderSchema = new Schema({
    registrationDate: Number,
    daliveryDate: Number,
    status: Number,
    advance: Number,
    comment: String,
    furnitureIds: [{
        type: Schema.Types.ObjectId,
        ref: "Furniture"
    }],
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
});

const Order = model("Order", orderSchema);

export default Order;