import express from "express";
import { getContest, getRecentContests, getRecipe, getContestById } from "../controllers/contest.js";

const router = express.Router();

router.get("/home", getContest);
router.get("/home/recent", getRecentContests);
router.get("/contest/:id", getContestById);
router.get("/recipe/:id", getRecipe);

export default router;