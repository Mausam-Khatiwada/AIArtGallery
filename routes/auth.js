

const express = require("express");
const dashController = require("../controllers/dashcontrol");
const authController = require("../controllers/auth");
const path = require("path");
const router = express.Router();
const mysql = require("../connection").con;
const { deleteUser } = require('../controllers/dashcontrol');
const { deleteReview } = require('../controllers/auth');
const { deleteAdmin } = require('../controllers/dashcontrol');
const multer = require('multer');
const artworkController = require('../controllers/artwork');
const {deleteArtwork} = require('../controllers/dashcontrol');



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



const adminStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/pictures/upload/admin');
  },
  filename: (req, file, cb) => {
    const username = req.body.adminusername;
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});
const adminupload = multer({ storage: adminStorage });





router.use(authController.isLoggedIn);

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
router.post('/addReview', authController.addReview, (req,res)=>{
res.redirect('/home');


});



// Update the route to include the upload middleware
router.post('/signup', upload.single('picture'), authController.signup);
router.post('/login', authController.login);
router.post('/createuser', upload.single('picture'),dashController.adminCreateUser,(req,res)=>{

res.redirect('/usermanagement');

});


router.post('/createadmin', adminupload.single('adminpicture'), dashController.adminCreateAdmin,(req,res)=>{


  res.redirect('/adminmanagement');
})


router.post('/updateuser', upload.single('picture'),dashController.adminUpdateUser,(req,res)=>{

res.redirect('/dashboard');

});
router.post('/updateadmin', adminupload.single('adminpicture'),dashController.adminUpdateAdmin,(req,res)=>{

res.redirect('/adminmanagement');

});
router.post('/deleteReview/:id', async(req,res)=>{
  const reviewId = req.params.id;
  try{
    await deleteReview(reviewId);
        res.redirect('/reviewsmanagement');

  }
  catch(err){
        res.status(500).send('Internal server error');

  }

})

router.post('/deleteUser/:id', async (req, res) => {
  const userId = req.params.id;

  try {
    await deleteUser(userId);
    res.redirect('/usermanagement');
  } catch (err) {
    res.status(500).send('Internal server error');
  }
});
router.post('/deleteAdmin/:id', async (req, res) => {
  const adminId = req.params.id;

  try {
    await deleteAdmin(adminId);
    res.redirect('/adminmanagement');
  } catch (err) {
    res.status(500).send('Internal server error');
  }
});
router.post('/deleteArtwork/:id', async (req, res) => {
  const artworkId = req.params.id;
// console.log(artworkId);
  try {
    await deleteArtwork(artworkId);
    res.redirect('/artworkmanagement');
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
