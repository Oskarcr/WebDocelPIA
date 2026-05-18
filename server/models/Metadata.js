import { Schema, model } from "mongoose";

const metadataSchema = new Schema({
    lastReportGeneration: {
        type: Date,
        required: true,
        default: () => new Date(2026, 0, 1)
    },
});

const Metadata = model("Metadata", metadataSchema);

export default Metadata;