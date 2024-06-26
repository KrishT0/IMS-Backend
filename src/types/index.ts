import mongoose from "mongoose";

type feedbackType = {
  mentor_id: mongoose.Types.ObjectId;
  intern_id: mongoose.Types.ObjectId;
  ratings: number;
  feedback: string;
};

type userType = {
  name: string;
  age: number;
  mobile: string;
  department: string;
  mentor: mongoose.Schema.Types.ObjectId;
  intern: mongoose.Schema.Types.ObjectId[];
};

type workType = {
  name: string;
  intern_id: mongoose.Types.ObjectId;
  month: string;
  project_worked: string;
  work_description: string;
};

export { feedbackType, userType, workType };
