import { Request, Response } from "express";
import UserModel from "../models/user.model";

const verifyMobileAuth = async (req: Request, res: Response) => {
  try {
    const { mobile } = req.body;
    console.log(typeof mobile);
    const userData = await UserModel.find({
      mobile: mobile,
    });
    res.json(userData);
  } catch (error) {
    res.status(500).send(error);
  }
};

export { verifyMobileAuth };
