const mongoose = require("mongoose");
const { Schema } = mongoose;

const saleSchema = new Schema({
    total: Number,
    date: Number,
    orderID: Number,
});

const Sale = mongoose.model("Sale", saleSchema);

module.exports = Sale;