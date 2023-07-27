

const express = require("express");
const dashController = require("../controllers/dashcontrol");
const authController = require("../controllers/auth");
const path = require("path");
const router = express.Router();
const mysql = require("../connection").con;
const { deleteUser } = require('../controllers/dashcontrol');

// Import the multer middleware for handling multipart form data
const multer = require('multer');
const artworkController = require('../controllers/artwork'); // Add this line to import the artwork controller

// ... (existing code)// Set up the destination and filename for file uploads using multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/pictures/upload/users');
  },
  filename: (req, file, callback) => {
    const username = req.body.username;
    const uniqueFileName = `${username}${path.extname(file.originalname)}`;
    callback(null, uniqueFileName);
  }
});

// Create the multer instance with the configured storage
const upload = multer({ storage: storage });

const artworkStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/pictures/upload/artworks');
  },
  filename: (req, file, cb) => {
    const username = req.body.artistusername;
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

const artworkUpload = multer({ storage: artworkStorage });

// Apply the isLoggedIn middleware before the routes
router.use(authController.isLoggedIn);

// Handle artwork form submission
router.post('/uploadArtwork', artworkUpload.single('artPicture'), (req, res) => {
  // Your code to handle artwork upload and save it to the database
  const { artistusername, artPrompt, arttitle, artistName } = req.body;
  const imageUrl = `/pictures/upload/artworks/${req.file.filename}`;

  mysql.query('INSERT INTO artwork SET ?', { username: artistusername, path: imageUrl, artist: artistName, arttitle: arttitle, prompt: artPrompt }, (error, results) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Art added successfully");
      res.redirect('/artworks');
    }
  });
});

// Update the route to include the upload middleware
router.post('/signup', upload.single('picture'), authController.signup);
router.post('/login', authController.login);
router.post('/dash', upload.single('picture'),dashController.adminCreateUser,(req,res)=>{

res.redirect('/dashboard');

});
router.post('/updatedash', upload.single('picture'),dashController.adminUpdateUser,(req,res)=>{

res.redirect('/dashboard');

});

router.post('/deleteUser/:id', async (req, res) => {
  const userId = req.params.id;

  try {
    await deleteUser(userId);
    res.redirect('/dashboard');
  } catch (err) {
    res.status(500).send('Internal server error');
  }
});


router.get('/artworks', async (req, res) => {
  try {
    const artworks = await artworkController.fetchArtworksFromDatabase(); // Use the artwork controller to fetch data
    res.render('artworks', { artworks: artworks });
  } catch (error) {
    console.error("Error fetching artwork data:", error);
    res.status(500).send("Error fetching data from the database.");
  }
});

module.exports = router;
