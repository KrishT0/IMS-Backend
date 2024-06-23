import { Request, Response } from "express";
import UserModel from "../models/user.model";

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await UserModel.find();
    res.json(users);
  } catch (error) {
    res.status(500).send(error);
  }
};

export { getAllUsers };
