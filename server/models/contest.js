import mongoose from 'mongoose';

const contestSchema = mongoose.Schema({
    name: String,
    number: String,// contest #
    creator: String,
    recipe: String,//stores ID
    startDate: Date,
    endDate: Date,
    submissions: { type: [String] },
    rules: String,
    prize: [String], 
})

var Contest = mongoose.model('Contest', contestSchema);

export default Contest;