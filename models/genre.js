const mongoose = require('mongoose')

const genreSchema = new mongoose.Schema({
    GenreId:{
        type:Number,
        required: true
    },
    Name:{
        type:String,
        required:true
    }
})

const Genre = mongoose.model('Genre', genreSchema)


module.exports = {Genre}