import { Schema, model } from "mongoose";

const saleSchema = new Schema({
    total: Number,
    date: Number,
    orderId: {
        type: Schema.Types.ObjectId,
        ref: "Order"
    }
});

const Sale = model("Sale", saleSchema);

export default Sale;