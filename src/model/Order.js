const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema({
    registrationDate: Number,
    daliveryDate: Number,
    status: Number,
    advance: Number,
    comment: String,
    furnitureID: [Number],
    userID: Number
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;