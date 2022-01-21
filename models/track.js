const mongoose = require('mongoose')

const trackSchema = new mongoose.Schema({
    TrackId:{
        type:Number,
        required:true
    },
    Name: {
        type:String,
        required:true
    },
    AlbumId:{
        type:Number,
        required:true
    },
    MediaTypeId:{
        type:Number,
        required:true
    },
    GenreId:{
        type:Number,
        required:true
    },
    Composer:{
        type:String
    },
    Milliseconds:{
        type:Number,
        required:true
    },
    Bytes:{
        type:Number,
        required:true
    },
    UnitPrice:{
        type:Number,
        required:true
    }

})

const Track = mongoose.model('Track', trackSchema)


module.exports = {Track}


