import { Request, Response } from "express";
import UserModel from "../models/user.model";
import WorkModel from "../models/work.model";

const getMentorsForInterns = async (req: Request, res: Response) => {
  try {
    const { department } = req.body;
    const users = await UserModel.find({
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
    const { intern_id, mentor_id } = req.body;
    await UserModel.findByIdAndUpdate(mentor_id, {
      $addToSet: { intern: intern_id },
    }).exec();
    await UserModel.findByIdAndUpdate(intern_id, {
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
    const { name, intern_id, month, project_worked, work_description } =
      req.body;

    const existingSubmission = await WorkModel.findOne({
      intern_id: intern_id,
      month,
    });
    if (existingSubmission) {
      return res.status(409).send({
        message: "Work details for this month have already been submitted.",
      });
    }
    const intern_work = new WorkModel({
      name,
      intern_id,
      month,
      project_worked,
      work_description,
    });
    intern_work.save();

    res.status(201).json({ message: "Work details successfully uploaded." });
  } catch (error) {
    res.status(500).send(error);
  }
};

export { getMentorsForInterns, selectingMentor, uploadingWorkDetails };
