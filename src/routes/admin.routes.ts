import express, { Router } from "express";
import {
  createIntern,
  getMonthlyReport,
} from "../controllers/admin.controller";

const router: Router = express.Router();

router.post("/create_intern", createIntern);
router.post("/get_monthly_report", getMonthlyReport);

export default router;