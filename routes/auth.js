const express = require("express");
const authController = require("../controllers/auth");
const path = require("path");
const router = express.Router();
const mysql = require("../connection").con;


// Import the multer middleware for handling multipart form data
const multer = require('multer');

// Set up the destination and filename for file uploads using multer


const storage = multer.diskStorage({
  destination: function (req, file, cb) {


 cb(null, 'public/pictures/upload/users');


    // Specify the destination folder for file uploads
  },
   filename: (req, file, callback) => {
    const username =req.body.username; 
    const uniqueFileName = `${username}${path.extname(file.originalname)}`; // Concatenate the file extension to the filename
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
    // You can modify the filename as per your requirement, e.g., add a timestamp
    const uniquePrefix =`${username}${path.extname(file.originalname)}`;
        cb(null, uniquePrefix);

  },
});

const artworkUpload = multer({ storage: artworkStorage });

// Your other route handlers and middleware go here...

module.exports = { router, artworkUpload };












// Apply the isLoggedIn middleware before the routes
router.use(authController.isLoggedIn);

// Update the route to include the upload middleware
router.post('/signup', upload.single('picture'), authController.signup);
router.post('/login', authController.login);











  // Now you should be able to access the uploaded image using req.file
  // and other form data using req.body (artPrompt in your case)
router.post('/artworks', artworkUpload.single('artPicture'), (req, res) => {
  // ... (same code as before) ...
  const username = req.body.artistusername;
  const { artPrompt } = req.body;
  const arttitle = req.body.arttitle;
  const artworkPicturePath = req.file.path; // The path where multer stored the image for artwork
  const artist = req.body.artistName;
  console.log(artist);
  console.log(username);
  mysql.query('INSERT INTO artwork SET ?', { username: username, artist: artist,arttitle:arttitle, prompt: artPrompt }, (error, results) => {
    if (error) {
      console.log(error);
    } else {
      
      console.log("Art added successfully");

     
    }
    // Redirect the user back to the artworks page or any other page
    res.redirect('/artworks');
  });
});




module.exports = router;
