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

export const deleteSubmission = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No submission with id: ${id}`);

    await Submission.findByIdAndRemove(id);

    res.json({ message: "Submission deleted successfully." });
}

export const getSubmissionsByQuery = async (req, res) => {
    const {contest, creator} = req.query;
    if (contest) {
        try {
            const subs = await Submission.find({contest}).sort({ _id: -1 });
            res.json({ data: subs });
        } catch (error) {    
            res.status(404).json({ message: error.message });
        }
    }
    if (creator) {
        try {
            const subs = await Submission.find({creator}).sort({ _id: -1 });
            res.json({ data: subs });
        } catch (error) {    
            res.status(404).json({ message: error.message });
        }
    }
    
}

export default router;