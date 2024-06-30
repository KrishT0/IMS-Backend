import { Request, Response } from "express";
import UserModel from "../models/user.model";
import FeedbackModel from "../models/feedback.model";

import { feedbackType } from "../types";

type getInternsRequestBodyType = {
  mentor_id: string;
};

const getInterns = async (req: Request, res: Response) => {
  try {
    const { mentor_id } = req.body as getInternsRequestBodyType;
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
      .select("_id name department")
      .exec();
    res.json({
      interns,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

const feedbackSubmission = async (req: Request, res: Response) => {
  try {
    const { mentor_id, feedback, ratings, intern_id } =
      req.body as feedbackType;
    const Feedback = new FeedbackModel<feedbackType>({
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
