const mongoose = require('mongoose')

const artistSchema = new mongoose.Schema({
    ArtistId:{
        type:Number,
        required: true
    },
    Name:{
        type:String,
        required:true
    }
})

const Artist = mongoose.model('Artist', artistSchema)


module.exports = {Artist}