import express from "express";
import { createSubmission } from "../controllers/submission.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post('/', createSubmission);

export default router;