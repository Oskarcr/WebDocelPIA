import { Schema, model } from "mongoose";

const orderSchema = new Schema({
    deliveredAt: Number,
    status: Number,
    advance: Number,
    comment: String,
    furnitures: [{
        type: Schema.Types.ObjectId,
        ref: "Furniture"
    }],
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
}, {
    timestamps: true
});

const Order = model("Order", orderSchema);

export default Order;