import { Schema, model } from "mongoose";

const saleSchema = new Schema({
    total: {
        type: Number,
        required: true
    },
    order: {
        type: Schema.Types.ObjectId,
        ref: "Order",
        required: true
    }
}, {
    timestamps: true
});

saleSchema.index({ createdAt: 1 });

const Sale = model("Sale", saleSchema);

export default Sale;