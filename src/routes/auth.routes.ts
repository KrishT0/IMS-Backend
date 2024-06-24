import express, { Router } from "express";
import { verifyMobileAuth } from "../controllers/auth.controller";

const router: Router = express.Router();

router.post("/verify-mobile", verifyMobileAuth);

export default router;
