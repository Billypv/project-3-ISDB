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

router.get("/albums/:id", (req, res) => {

    Album.findOne({AlbumId: parseInt(req.params.id)}, async (err, album) => {
    if (err) {
        res.status(400).json({
          message: "Album not found",
        })
    } else if (! album) {
        res.status(404).json({message: "Album not found"})
    
      } else  {
        console.log(await Artist.findOne({ArtistId: album.ArtistId}).exec().Name)
        
        res.json({Title: album.Title, Artist:  (await Artist.findOne({ArtistId: album.ArtistId}).exec()).Name, Tracks:  (await Track.find({AlbumId: album.AlbumId}).exec()).map(track => track.Name)  })
      }
    });
  })






module.exports = router
