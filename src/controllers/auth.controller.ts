import { Request, Response } from "express";
import UserModel from "../models/user.model";

const verifyMobileAuth = async (req: Request, res: Response) => {
  try {
    const { mobile } = req.body;
    const userData = await UserModel.find({
      mobile: mobile,
    })
      .lean()
      .exec();
    res.json(userData);
  } catch (error) {
    res.status(500).send(error);
  }
};

export { verifyMobileAuth };
