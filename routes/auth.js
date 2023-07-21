const express = require("express");
const authController = require("../controllers/auth");
const path = require("path");
const router = express.Router();

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

// Apply the isLoggedIn middleware before the routes
router.use(authController.isLoggedIn);

// Update the route to include the upload middleware
router.post('/signup', upload.single('picture'), authController.signup);
router.post('/login', authController.login);

module.exports = router;
