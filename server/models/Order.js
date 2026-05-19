import { Schema, model } from "mongoose";

const orderSchema = new Schema({
    deliveredAt: {
        type: Date,
    },
    status: {
        type: Number,
        required: true
    },
    sent: {
        type: Boolean,
        required: true,
        default: false
    },
    comment: String,
    furnitures: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: "Furniture"
        }],
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, {
    timestamps: true
});

orderSchema.index({ user: 1 });
orderSchema.index({ sent: 1 });

const Order = model("Order", orderSchema);

export default Order;