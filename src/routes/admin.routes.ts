import express, { Router } from "express";
import {
  createIntern,
  getMonthlyReport,
  promoteInternsToMentor,
  getAllInterns,
} from "../controllers/admin.controller";

const router: Router = express.Router();

router.post("/create_intern", createIntern);
router.post("/get_monthly_report", getMonthlyReport);
router.post("/promote_interns_to_mentor", promoteInternsToMentor);
router.get("/get_all_interns", getAllInterns);

export default router;
