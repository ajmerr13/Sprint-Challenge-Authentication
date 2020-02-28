const router = require('express').Router();
const bc = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Users = require('../model');
const {jwtSecret} = require('./secrets');

router.post('/register', (req, res) => {
  let user = req.body;
  const hash = bc.hashSync(user.password, 8); 
  user.password = hash;

  Users.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error);
    });
 
});

router.post('/login', (req, res) => {

  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bc.compareSync(password, user.password)) {

        const token = signToken(user); // <<<<<<<<<<<

        res.status(200).json({ token }); // <<<<<<<<<<
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });

});

function signToken(user) {
  const payload = {
    username: user.username
  };

  const options = {
    expiresIn: '1d'
  };

  return jwt.sign(payload, jwtSecret, options);
}

module.exports = router;