const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema({
  AlbumId: {
    type: Number,
    required: true,
    unique: true,
  },
  Title: {
    type: String,
    required: true,
  },
  ArtistId: {
    type: Number,
    required: true,
  },
});

const Album = mongoose.model('Album', albumSchema);

module.exports = { Album };
