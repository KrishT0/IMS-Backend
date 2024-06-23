import express from "express";
import { getAllUsers } from "../controllers/user.controller";

const router = express.Router();

router.get("/getalluser", getAllUsers);

export default router;
