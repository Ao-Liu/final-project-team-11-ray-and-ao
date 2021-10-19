const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

// const mongoose = require('mongoose')

// mongoose
//     .connect('mongodb://127.0.0.1:27017/reciperun', { useNewUrlParser: true })
//     .catch(e => {
//         console.error('Connection error', e.message)
//     })

// const db = mongoose.connection


const movieRouter = require('./routes/recipe-router')

const app = express()
const apiPort = process.env.PORT || 8080

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())

// db.on('error', console.error.bind(console, 'MongoDB connection error:'))

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use('/api', movieRouter)

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))