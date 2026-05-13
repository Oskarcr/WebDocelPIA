import { Schema, model } from "mongoose";

const reportSchema = new Schema({
    income: Number,
    sale: [{
        type: Schema.Types.ObjectId,
        ref: "Sale"
    }]
},{
    timestamps: true
});

const Report = model("Report", reportSchema);

export default Report;