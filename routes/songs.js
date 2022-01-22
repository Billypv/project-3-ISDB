const express = require('express');
const passport = require('passport');
const { Album } = require('../models/album');
const { Genre } = require('../models/genre');
const { Artist } = require('../models/artist');
const { MediaType } = require('../models/media_type');
const { Track } = require('../models/track');

const router = express.Router();

router.get('/genres', passport.authenticate('jwt', { session: false }), (req, res) => {
  Genre.find({}, (err, genres) => {
    if (err) {
      res.status(404).json({
        message: 'Genres not found',
      });
    } else {
      res.json(genres.map((genre) => genre.Name));
    }
  });
});

router.get('/albums/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Album.findOne({ AlbumId: parseInt(req.params.id) }, async (err, album) => {
    if (err) {
      res.status(400).json({
        message: 'Album not found',
      });
    } else if (!album) {
      res.status(404).json({ message: 'Album not found' });
    } else {
      res.json({
        Title: album.Title,
        Artist: (await Artist.findOne({ ArtistId: album.ArtistId }).exec()).Name,
        Tracks: (await Track.find({ AlbumId: album.AlbumId }).exec()).map((track) => track.Name),
      });
    }
  });
});

router.get('/tracks/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Track.findOne({ TrackId: parseInt(req.params.id) }, async (err, track) => {
    if (err) {
      res.status(400).json({
        message: 'Track not found',
      });
    } else if (!track) {
      res.status(404).json({ message: 'Track not found' });
    } else {
      res.json({
        Title: track.Name,
        Album: (await Album.findOne({ AlbumId: track.AlbumId }).exec()).Name,
        Artist: (await Artist.findOne(
          { ArtistId: (await Album.findOne({ AlbumId: track.AlbumId }).exec())
        .ArtistId }).exec()).Name,
        Composer: track.Composer,
        MediaType: (await MediaType.find({ MediaTypeId: track.MediaTypeId }).exec()).Name,
        Genre: (await Genre.findOne({ GenreId: track.GenreId }).exec()).Name,
        Milliseconds: track.Milliseconds,
        Bytes: track.Bytes,
        UnitPrice: track.UnitPrice,
      });
    }
  });
});

router.get('/artists/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Artist.findOne({ ArtistId: parseInt(req.params.id) }, async (err, artist) => {
    if (err) {
      res.status(400).json({
        message: 'Track not found',
      });
    } else if (!artist) {
      res.status(404).json({ message: 'Artist not found' });
    } else {
      const albums = (await Album.find({ ArtistId: artist.ArtistId }).exec());
      res.json({
        ArtistName: artist.Name,
        Albums: albums.map((album) => album.Title),
        Tracks: (await Promise.all(albums.map((album) => Track.find({ AlbumId: album.AlbumId }).exec()))).flat().map((track) => track.Name),

      });
    }
  });
});

router.post('/tracks', passport.authenticate('jwt', { session: false }), async (req, res) => {
  if (req.body.Name && req.body.AlbumId && req.body.GenreId && req.body.Milliseconds && req.body.Bytes && req.body.UnitPrice) {
    if ((await Album.findOne({ AlbumId: req.body.AlbumId }).exec()) && (await Genre.findOne({ GenreId: req.body.GenreId }).exec())) {
      const track = new Track({
        TrackId: (await Track.findOne({}).sort('-TrackId').exec()).TrackId + 1,
        Name: req.body.Name,
        AlbumId: req.body.AlbumId,
        GenreId: req.body.GenreId,
        Milliseconds: req.body.Milliseconds,
        Bytes: req.body.Bytes,
        UnitPrice: req.body.UnitPrice,
        Composer: req.body.Composer,
        MediaTypeId: req.body.MediaTypeId,
      });
      try {
        const newTrack = await track.save();
        res.status(201).json(newTrack);
      } catch (err) {
        res.status(400).json({ message: err });
      }
    } else {
      res.status(400).json({ message: 'Album and Genre must already exist' });
    }
  } else {
    res.status(400).json({ message: 'expected name, AlbumId, GenreId, Milliseconds, Bytes and UnitPrice' });
  }
});

module.exports = router;
