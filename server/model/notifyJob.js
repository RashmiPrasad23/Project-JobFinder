const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const NotifyJobSchema = new Schema(
    {
        companyName: {
            type: String,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
        profile: {
            type: String,
        },
        currentCount: {
            type: String
        },
        userId: { type: Schema.Types.ObjectId, ref: "User" },

    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("NotifyJob", NotifyJobSchema);
