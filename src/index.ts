import express, { Express } from "express";
import dotenv from "dotenv";
import connectDB from "./db";
import morgan from "morgan";
import cors from "cors";

import internRouter from "./routes/intern.routes";
import authRouter from "./routes/auth.routes";
import mentorRouter from "./routes/mentor.routes";
import adminRouter from "./routes/admin.routes";
import { checkAccessToken } from "./middlewares/auth.middleware";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

connectDB().then(() => {
  app.use(morgan("dev"));
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use("/api/auth", authRouter);
  app.use(checkAccessToken);
  app.use("/api/intern", internRouter);
  app.use("/api/mentor", mentorRouter);
  app.use("/api/admin", adminRouter);

  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
});
