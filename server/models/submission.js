import mongoose from 'mongoose';

const submissionSchema = mongoose.Schema({
    title: String,
    selectedFile: String,
    creator: String,
    createdAt: {
        type: Date,
        default: new Date(),
    },
    contest: String
})

var Submission = mongoose.model('Submission', submissionSchema);

export default Submission;