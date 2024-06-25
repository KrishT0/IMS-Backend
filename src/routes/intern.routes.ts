import express, { Router } from "express";
import {
  getMentorsForInterns,
  selectingMentor,
  uploadingWorkDetails,
} from "../controllers/intern.controller";

const router: Router = express.Router();

router.post("/get_mentor_for_interns", getMentorsForInterns);
router.post("/selecting_mentor", selectingMentor);
router.post("/uploading_work_details", uploadingWorkDetails);

export default router;
