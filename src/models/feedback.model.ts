import mongoose from "mongoose";
import { feedbackType } from "../types";

const feedbackSchema = new mongoose.Schema({
  mentor_id: {
    type: mongoose.Types.ObjectId,
    ref: "users",
    required: [true, "Mentor ID is required"],
  },
  intern_id: {
    type: mongoose.Types.ObjectId,
    ref: "users",
    required: [true, "Intern ID is required"],
  },
  ratings: {
    type: Number,
    required: [true, "Ratings is required"],
  },
  feedback: {
    type: String,
    trim: true,
    required: [true, "Feedback is required"],
  },
  month: {
    type: Number,
    required: [true, "Month is required"],
    min: 1,
    max: 12,
  },
});

const Feedback = mongoose.model<feedbackType>("Feedback", feedbackSchema);
export default Feedback;
