import express from 'express';
import mongoose from 'mongoose';
import endOfDay from 'date-fns/endOfDay/index.js'
import startOfDay from 'date-fns/startOfDay/index.js'

import Contest from '../models/contest.js';
import Recipe from '../models/recipe.js';

const router = express.Router();

export const getContest = async (req, res) => {
    try {
        const contest = await Contest.find({ 
            startDate: {
                $gte: startOfDay(new Date()), 
                $lt: endOfDay(new Date())
            }
        });
        res.status(200).json(contest);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
export const getContestById = async (req, res) => { 
    const { id } = req.params;

    try {
        const contest = await Contest.findById(id);
        
        res.status(200).json(contest);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getRecentContests = async (req, res) => {
    try {
        const LIMIT = 3;
        const contests = await Contest.find().sort({ startDate:-1 }).limit(LIMIT);
        res.status(200).json(contests);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getRecipe = async (req, res) => {
    const { id } = req.params;
    try {
        const recipe = await Recipe.findById(id);
        res.status(200).json(recipe);
    } catch (error) {
        res.status(404).json({ message: error.message });
    } 
}

export const updateContest = async (req, res) => {
    const { id } = req.params;
    const { submissions } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No contest with id: ${id}`);

    const updatedContest = { submissions: submissions, _id: id };

    await Contest.findByIdAndUpdate(id, updatedContest, { new: true });

    res.json(updatedPost);
}

export default router;