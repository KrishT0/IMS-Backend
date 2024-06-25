import mongoose from "mongoose";

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
    required: true,
  },
  work_description: {
    type: String,
    trim: true,
    required: true,
  },
  month: {
    type: Number,
    required: [true, "Month is required"],
    min: 1,
    max: 12,
  },
});

const Work = mongoose.model("Work", WorkSchema);
export default Work;
