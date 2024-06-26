import { Request, Response } from "express";
import UserModel from "../models/user.model";
import FeedbackModel from "../models/feedback.model";

const getInterns = async (req: Request, res: Response) => {
  try {
    const { mentor_id } = req.body;
    const mentor = await UserModel.findOne({ _id: mentor_id });
    if (!mentor || !mentor.intern || mentor.intern.length === 0) {
      return res.status(404).json({
        status: "Error",
        message: "No interns found for this mentor.",
      });
    }
    const interns = await UserModel.find({
      _id: { $in: mentor.intern },
    })
      .select("-_id name department")
      .exec();
    res.json({
      status: "Success",
      data: interns,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

const feedbackSubmission = async (req: Request, res: Response) => {
  try {
    const { mentor_id, intern_id, feedback, ratings } = req.body;
    const Feedback = new FeedbackModel({
      mentor_id,
      intern_id,
      feedback,
      ratings,
    });
    Feedback.save();
    res.json({
      message: "Feedback Submitted",
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

export { getInterns, feedbackSubmission };
