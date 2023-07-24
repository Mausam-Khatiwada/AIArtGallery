
const express = require("express");
const userController = require('../controllers/auth');
const router = express.Router();
const artworkController = require('../controllers/artwork'); // Add this line to import the artwork controller

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/login', (req, res) => {
  res.render('login');
});


router.get('/signup', (req, res) => {
  res.render('signup');
});


router.get('/profile', userController.isLoggedIn, (req, res) => {
  if (req.users) {
    res.render('profile', { users: req.users });
  } else {
    res.redirect("/login");
  }
});

router.get('/home', userController.isLoggedIn, (req, res) => {
  if (req.users) {
    res.render('home', { users: req.users });
  } else {
    res.redirect("/login");
  }
});

router.get('/artworks', userController.isLoggedIn, async (req, res, next) => {
  if (req.users) {
    try {
      const artworks = await artworkController.fetchArtworksFromDatabase(); // Use the artwork controller to fetch data
      res.render('artworks', { users: req.users, artworks }); // Pass the artworks data to the template
    } catch (error) {
      console.error("Error fetching artwork data:", error);
      return res.status(500).send("Error fetching data from the database.");
    }
  } else {
    res.redirect("/login");
  }
});

module.exports = router;
