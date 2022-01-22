const express = require('express');
const jwt = require('jsonwebtoken');
const { User } = require('../models/user');

const jwtOptions = {
  secretOrKey: 'theKey',
};

const router = express.Router();

router.post('/login', (req, res) => {
  if (req.body.username && req.body.password) {
    User.findOne({ username: req.body.username }, (err, user) => {
      if (user) {
        user.authenticate(req.body.password, (err, user) => {
          if (err) {
            res.status(401).json({ message: 'invalid username or password' });
          } else {
            const unique_identifier = { username: user.username };
            const token = jwt.sign(unique_identifier, jwtOptions.secretOrKey);
            res.status(200).json({ message: `welcome, ${user.username}`, token });
          }
        });
      } else {
        res.status(401).json({ message: 'invalid username or password' });
      }
    });
  } else {
    res.status(400).json({ message: 'missing username or password' });
  }
});

router.post('/register', (req, res) => {
  if (req.body.username && req.body.password) {
    User.findOne({ username: req.body.username }, (err, user) => {
      if (err) { res.status(401).json(err); } else if (user) { res.status(401).json({ message: 'username is in use' }); } else {
        const newUser = new User({ username: req.body.username });
        User.register(
          newUser,
          req.body.password,
          (err) => {
            if (err) { res.status(401).json(err); } else {
              res.status(201).json({ message: 'registration successful' });
            }
          },
        );
      }
    });
  } else {
    res.status(401).json({ message: 'missing username or password' });
  }
});

module.exports = router;
