import { Request, Response } from "express";
import UserModel from "../models/user.model";
import WorkModel from "../models/work.model";

import { userType, workType } from "../types";

type getMentorsForInternsRequestBodyType = {
  department: string;
};

type selectingMentorRequestBodyType = {
  intern_id: string;
  mentor_id: string;
};

const getMentorsForInterns = async (req: Request, res: Response) => {
  try {
    const { department } = req.body as getMentorsForInternsRequestBodyType;
    const users = await UserModel.find<userType>({
      department: department,
      role: "mentor",
    })
      .select("_id name")
      .exec();
    res.json(users);
  } catch (error) {
    res.status(500).send(error);
  }
};

const selectingMentor = async (req: Request, res: Response) => {
  try {
    const { intern_id, mentor_id } = req.body as selectingMentorRequestBodyType;
    await UserModel.findByIdAndUpdate(mentor_id, {
      $addToSet: { intern: intern_id },
    }).exec();
    await UserModel.findByIdAndUpdate<userType>(intern_id, {
      mentor: mentor_id,
    }).exec();
    res.json({
      message: "Mentor selected successfully ",
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

const uploadingWorkDetails = async (req: Request, res: Response) => {
  try {
    const {
      name,
      intern_id,
      month,
      project_worked,
      work_description,
      workHours,
    } = req.body as workType;

    const existingSubmission = await WorkModel.findOne<workType>({
      intern_id: intern_id,
      month,
    }).exec();
    if (existingSubmission) {
      return res.status(409).json({
        message: "Work details for this month have already been submitted.",
      });
    }
    const intern_work = new WorkModel<workType>({
      name,
      intern_id,
      month,
      project_worked,
      work_description,
      workHours,
    });
    intern_work.save();

    res.status(201).json({ message: "Work details successfully uploaded." });
  } catch (error) {
    res.status(500).send(error);
  }
};

export { getMentorsForInterns, selectingMentor, uploadingWorkDetails };
