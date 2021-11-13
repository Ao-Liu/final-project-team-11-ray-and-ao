import mongoose from 'mongoose';

const contestSchema = mongoose.Schema({
    name: String,
    number: String,// contest #
    creator: String,
    recipe: String,//stores ID
    startDate: Date,
    endDate: Date,
    submissions: [String],// stores IDs
    rules: String,
    prize: [String], 
})

var Contest = mongoose.model('Contest', contestSchema);

export default Contest;