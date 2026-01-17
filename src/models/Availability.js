import mongoose from "mongoose";

const availabilitySchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
        },
        weekdayHours: {
            type: Number,
            required: true,
            min: 0,
            max: 24,
        },
        weekendHours: {
            type: Number,
            required: true,
            min: 0,
            max: 24,
        },
    },
    { timestamps: true }
);

export default mongoose.model("Availability", availabilitySchema);