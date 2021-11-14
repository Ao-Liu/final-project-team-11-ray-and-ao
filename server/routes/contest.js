import express from "express";
import { getContest, getRecentContests, getRecipe, getContestById, updateContest } from "../controllers/contest.js";

const router = express.Router();
import auth from "../middleware/auth.js";

router.get("/home", getContest);
router.get("/home/recent", getRecentContests);
router.get("/contest/:id", getContestById);
router.patch("/contest/:id", updateContest);
router.get("/recipe/:id", getRecipe);

export default router;