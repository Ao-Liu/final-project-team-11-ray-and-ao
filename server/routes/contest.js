import express from "express";
import { getContest, getRecentContests, getRecipe } from "../controllers/contest.js";

const router = express.Router();

router.get("/", getContest);
router.get("/recent", getRecentContests);
router.get("/recipe/:id", getRecipe);

export default router;