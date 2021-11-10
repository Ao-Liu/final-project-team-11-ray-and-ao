import mongoose from 'mongoose';

const contestSchema = mongoose.Schema({
    title: String,
    number: String,// contest #
    recipe: String,//stores ID
    startAt: {
        type: Date,
        default: new Date(),
    },
    endAt: {
        type: Date,
        default: new Date(),
    },
    submissions: [String],// stores IDs
    prizes: [String], 
    rule: String,
})

var ContestSchema = mongoose.model('Contest', contestSchema);

export default ContestSchema;