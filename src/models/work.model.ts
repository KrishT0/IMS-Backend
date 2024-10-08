import mongoose from "mongoose";
import { workType } from "../types";

const WorkSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
  },
  intern_id: {
    type: mongoose.Types.ObjectId,
    ref: "users",
    required: [true, "intern ID is required"],
  },
  project_worked: {
    type: String,
    trim: true,
    required: [true, "Project work is required"],
  },
  work_description: {
    type: String,
    trim: true,
    required: [true, "Work description is required"],
  },
  month: {
    type: Number,
    required: [true, "Month is required"],
    min: 1,
    max: 12,
  },
  workHours: {
    type: Number,
    required: [true, "Work hours is required"],
  },
});

const Work = mongoose.model<workType>("Work", WorkSchema);
export default Work;
