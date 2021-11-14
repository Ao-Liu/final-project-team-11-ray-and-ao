import express from "express";
import { createSubmission, deleteSubmission, getSubmissionsByContest } from "../controllers/submission.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post('/', auth, createSubmission);
router.delete('/:id', auth, deleteSubmission);
router.get('/', getSubmissionsByContest);

export default router;