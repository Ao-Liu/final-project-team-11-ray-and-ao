import express from 'express';
import mongoose from 'mongoose';

import Submission from '../models/submission.js';

const router = express.Router();
export const createSubmission = async (req, res) => {
    const sub = req.body;
    const newSub = new Submission({ ...sub, createdAt: new Date() })
    try {
        await newSub.save();
        res.status(201).json(newSub);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export default router;