import express from "express";
import { createSubmission, deleteSubmission, getSubmissionsByQuery, getSubmissionById } from "../controllers/submission.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post('/', auth, createSubmission);
router.delete('/:id', auth, deleteSubmission);
router.get('/', getSubmissionsByQuery);
router.get('/:id', getSubmissionById);

export default router;