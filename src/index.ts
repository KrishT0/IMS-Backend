import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import connectDB from "./db";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
});
