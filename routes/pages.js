
const express = require("express");
const userController = require('../controllers/auth');
const dashController = require('../controllers/dashcontrol');
const router = express.Router();
const artworkController = require('../controllers/artwork'); // Add this line to import the artwork controller

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/adminmanagement',
  userController.isAdminLoggedIn,
 dashController.getAdmin,
 (req, res) => {
if (req.admin) {
   res.render('adminmanagement',{
    getAdmin:req.getAdmin
   });
}
else{
          res.redirect("/login");

}
 
});
router.get('/usermanagement',
 userController.getUsers,
userController.isAdminLoggedIn,

  (req, res) => {
    if (req.admin) {
        res.render('usermanagement',{
     getUsers:req.getUsers
  });
    }
    else{
        res.redirect("/login");
    }

});
router.get('/signup', (req, res) => {
  res.render('signup');
});
router.get('/dashboard',
  userController.isAdminLoggedIn,
  userController.countUsers,
  userController.countAdmin,
  userController.countArtworks,
 
   (req, res) => {
  if (req.admin) {
    res.render('dashboard', { 
      admin: req.admin,
      userCount:req.userCount,
      adminCount:req.adminCount,
      artworkCount:req.artworkCount,
    
    });
  } else {
    res.redirect("/login");
  }
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
router.get('/logout', userController.logout);

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
