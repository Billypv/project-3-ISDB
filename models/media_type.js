const mongoose = require('mongoose');

const mediaTypeSchema = new mongoose.Schema({
  MediaTypeId: {
    type: Number,
    required: true,
    unique: true,
  },
  Name: {
    type: String,
    required: true,
  },
});

const MediaType = mongoose.model('MediaType', mediaTypeSchema);

module.exports = { MediaType };
