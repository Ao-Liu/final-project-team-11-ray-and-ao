import mongoose from 'mongoose';

const recipeSchema = mongoose.Schema({
    name: String,
    fromArea: String,
    instructions: String,
    thumbUrl: String,
    videoUrl: String,
    ingredients: [String],
    ingMeasures: [String]
})

var Recipe = mongoose.model('Recipe', recipeSchema);

export default Recipe;