import express, { Express } from "express";
import dotenv from "dotenv";
import connectDB from "./db";
import morgan from "morgan";

import internRouter from "./routes/intern.routes";
import authRouter from "./routes/auth.routes";
import mentorRouter from "./routes/mentor.routes";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

connectDB().then(() => {
  app.use(morgan("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use("/api/auth", authRouter);

  app.use("/api/intern", internRouter);
  app.use("/api/mentor", mentorRouter);

  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
});
