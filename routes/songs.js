const express =  require('express')
const passport = require("passport");
const { Album } = require('../models/album');
const { Genre } = require('../models/genre');
const {Artist} = require('../models/artist')
const {MediaType} = require('../models/media_type')
const {Track} = require('../models/track')


const router =  express.Router()

router.get("/genres", passport.authenticate('jwt', {session: false}), (req, res) => {
    Genre.find({}, function (err, genres) {
      if (err) {
        res.status(404).json({
          message: "Genres not found",
        });
      } else {
        res.json(genres.map(genre => genre.Name))
      }
    });
  })

router.get("/albums/:id", passport.authenticate('jwt', {session: false}), (req, res) => {
    Album.findOne({AlbumId: parseInt(req.params.id)}, function (err, album) {
    if (err) {
        res.status(400).json({
          message: "Album not found",
        })
    } else if (! album) {
        res.status(404).json({message: "Album not found"})
    
      } else  {
        
        
        res.json(album)
      }
    });
  })






module.exports = router
