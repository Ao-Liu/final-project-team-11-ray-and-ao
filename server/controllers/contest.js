import express from 'express';
import mongoose from 'mongoose';
import endOfDay from 'date-fns/endOfDay/index.js'
import startOfDay from 'date-fns/startOfDay/index.js'

import Contest from '../models/contest.js';

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

export default router;