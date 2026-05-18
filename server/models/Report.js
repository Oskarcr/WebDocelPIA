import { Schema, model } from "mongoose";

const reportSchema = new Schema({
    income: {
        type: Number,
        required: true,
        default: 0
    },
    folio: {
        type: Number,
        required: true,
        default: 1
    },
    period: {
        type: Date,
        required: true
    },
    sales: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: "Sale"
        }],
        default: []
    }
},{
    timestamps: true
});

reportSchema.index({ createdAt: 1 });

const Report = model("Report", reportSchema);

export default Report;