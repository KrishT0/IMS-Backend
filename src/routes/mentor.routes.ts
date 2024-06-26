import express, { Router } from "express";
import {
  getInterns,
  feedbackSubmission,
} from "../controllers/mentor.controller";

const router: Router = express.Router();

router.post("/get_interns", getInterns);
router.post("/feedback_submission", feedbackSubmission);

export default router;
