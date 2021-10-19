
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Recipe = new Schema(
    {
        name: { type: String, required: true },
        instructions: { type: [String], required: true },
        thumburl: { type: Number, required: true },
    },
    { timestamps: true },
)

module.exports = mongoose.model('recipes', Recipe)