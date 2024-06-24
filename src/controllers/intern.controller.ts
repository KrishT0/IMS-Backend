import { Request, Response } from "express";
import UserModel from "../models/user.model";

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
      status: "Success",
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

const getMentor = async (req: Request, res: Response) => {
  try {
    const users = await UserModel.find({ role: "mentor" });
    res.json(users);
  } catch (error) {
    res.status(500).send(error);
  }
};

export { getMentorsForInterns, selectingMentor, getMentor };
