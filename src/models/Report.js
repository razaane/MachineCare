const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
    machine: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Machine",
        required: true
    },
    declaredBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    description: {
        type: String,
        required: true
    },
    statut: {
        type: String,
        enum: ["ouvert", "en_cours", "resolu"],
        default: "ouvert"
    },
    resolutionNote: {
        type: String,
        default: null
    },
    resolvedAt: {
        type: Date,
        default: null
    }
},
{
    timestamps: true
}
);

const Report = mongoose.model("Report", reportSchema);
module.exports = Report;