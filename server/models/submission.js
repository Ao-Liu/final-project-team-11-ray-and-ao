import mongoose from 'mongoose';

const submissionSchema = mongoose.Schema({
    title: String,
    selectedFile: String,
    creator: String,
    creatorName: String,
    createdAt: {
        type: Date,
        default: new Date(),
    },
    comments: { type: [String], default: [] },
    contest: String,
    message: String
})

var Submission = mongoose.model('Submission', submissionSchema);

export default Submission;