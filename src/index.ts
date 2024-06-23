import express, { Express } from "express";
import dotenv from "dotenv";
import connectDB from "./db";
import morgan from "morgan";

import userRouter from "./routes/user.route";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

connectDB().then(() => {
  app.use(morgan("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use("/api/user", userRouter);

  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
});
