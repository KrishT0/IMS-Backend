import { Request, Response } from "express";
import UserModel from "../models/user.model";

import { userType } from "../types";

type verifyMobileAuthRequestBodyType = {
  mobile: string;
};

const verifyMobileAuth = async (req: Request, res: Response) => {
  try {
    const { mobile } = req.body as verifyMobileAuthRequestBodyType;
    const userData = await UserModel.find<userType>({
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
