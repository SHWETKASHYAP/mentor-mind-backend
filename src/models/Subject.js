import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        name: {
            type: String,
            required: true,
            trim: true,
        },
        difficulty: {
            type: String,
            enum: ["easy", "medium", "hard"],
            required: true,
        },
        examDate: {
            type: Date,
            required: true,
        }
    },
    {timestamps: true}
);

export default mongoose.model("Subject", subjectSchema);