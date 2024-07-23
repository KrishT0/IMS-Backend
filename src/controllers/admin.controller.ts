import { Request, Response } from "express";
import UserModel from "../models/user.model";

type createInternRequestBodyType = {
  name: string;
  age: number;
  mobile: string;
  department: string;
};

type getMonthlyReportRequestBodyType = {
  month: string;
};

export const createIntern = async (req: Request, res: Response) => {
  try {
    const { name, age, mobile, department } =
      req.body as createInternRequestBodyType;

    const intern = new UserModel({
      name,
      age,
      mobile,
      department,
    });
    intern.save();
    res.json({
      message: "Intern created successfully",
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getMonthlyReport = async (req: Request, res: Response) => {
  try {
    const { month } = req.body as getMonthlyReportRequestBodyType;

    const pipeline = [
      {
        $match: {
          role: "intern",
        },
      },
      {
        $lookup: {
          from: "works",
          localField: "_id",
          foreignField: "intern_id",
          as: "work_report",
          pipeline: [
            {
              $match: {
                month: month,
              },
            },
          ],
        },
      },
      {
        $unwind: {
          path: "$work_report",
          // preserveNullAndEmptyArrays: true
        },
      },
      {
        $lookup: {
          from: "feedbacks",
          localField: "_id",
          foreignField: "intern_id",
          as: "feedbacks",
          pipeline: [
            {
              $match: {
                month: month,
              },
            },
          ],
        },
      },
      {
        $unwind: {
          path: "$feedbacks",
          // preserveNullAndEmptyArrays: true
        },
      },
      {
        $project: {
          _id: 0,
          name: 1,
          age: 1,
          mobile: 1,
          department: 1,
          project_worked: "$work_report.project_worked",
          work_description: "$work_report.work_description",
          feedback: "$feedbacks.feedback",
          rating: "$feedbacks.ratings",
        },
      },
    ];

    const result = await UserModel.aggregate(pipeline);
    res.json(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const promoteInternsToMentor = async (req: Request, res: Response) => {
  try {
    const { intern_id } = req.body;
    const internExists = await UserModel.findById(intern_id).exec();
    if (!internExists) {
      return res.status(404).json({
        message: "Intern not found",
      });
    }

    await UserModel.updateOne(
      { _id: intern_id },
      {
        role: "mentor",
      }
    ).exec();
    return res.json({
      message: "Intern role updated to mentor",
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getAllInterns = async (req: Request, res: Response) => {
  try {
    const interns = await UserModel.find({ role: "intern" }).exec();
    res.json(interns);
  } catch (error) {
    res.status(500).send(error);
  }
};
