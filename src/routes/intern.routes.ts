import express, { Router } from "express";
import {
  getMentorsForInterns,
  selectingMentor,
  getMentor,
} from "../controllers/intern.controller";

const router: Router = express.Router();

router.post("/get_mentor_for_interns", getMentorsForInterns);
router.post("/selecting_mentor", selectingMentor);
router.get("/getmentor", getMentor);

export default router;
