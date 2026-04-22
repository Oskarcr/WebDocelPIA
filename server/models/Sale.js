import { Schema, model } from "mongoose";

const saleSchema = new Schema({
    total: Number,
    order: {
        type: Schema.Types.ObjectId,
        ref: "Order"
    }
}, {
    timestamps: true
});

const Sale = model("Sale", saleSchema);

export default Sale;