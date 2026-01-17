import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
  subject: String,
  hours: Number,
  focus: String,
});

const daySchema = new mongoose.Schema({
  date: String,
  sessions: [sessionSchema],
});

const studyPlanSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    summary: String,
    plan: [daySchema],
  },
  { timestamps: true }
);

export default mongoose.model("StudyPlan", studyPlanSchema);
