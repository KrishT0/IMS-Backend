import { Request, Response } from "express";
import UserModel from "../models/user.model";

type createInternRequestBodyType = {
  name: string;
  age: number;
  mobile: string;
  department: string;
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
