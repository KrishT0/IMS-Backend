import { Request, Response, NextFunction } from "express";
import admin from "../firebase/firebase.config";

export const checkAccessToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = req.headers.authorization?.split(" ")[1];
  if (!accessToken) {
    return res
      .status(401)
      .json({ message: "Access token is required", tokenExpired: false });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(accessToken);
    if (decodedToken) {
      next();
    }
  } catch (error) {
    if ((error as any).code === "auth/id-token-expired") {
      console.log(error);
      return res
        .status(401)
        .json({ message: "Access token has expired", tokenExpired: true });
    }
    return res
      .status(401)
      .json({ message: (error as Error).message, tokenExpired: false });
  }
};
