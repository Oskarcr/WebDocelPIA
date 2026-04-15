const mongoose = require("mongoose");
const { Schema } = mongoose;

const reportSchema = new Schema({
    income: Number,
    type: Number,
    salesID: [Number],
});

const Report = mongoose.model("Report", reportSchema);

module.exports = Report;