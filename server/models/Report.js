import { Schema, model } from "mongoose";

const reportSchema = new Schema({
    income: Number,
    type: Number,
    saleIds: [{
        type: Schema.Types.ObjectId,
        ref: "Sale"
    }]
});

const Report = model("Report", reportSchema);

export default Report;