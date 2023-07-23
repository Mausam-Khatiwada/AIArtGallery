const express = require("express");
const userController = require('../controllers/auth')
const router = express.Router();




router.get('/', (req,res)=>{
	res.render('index');
});

router.get('/login', (req,res)=>{
	res.render('login');
});
router.get('/signup', (req,res)=>{
	res.render('signup');
});
router.get('/profile',userController.isLoggedIn,(req,res)=>{
		if (req.users) {
res.render('profile',{users: req.users});
	}
	else{
		res.redirect("/login");
	}

	

});



router.get('/artworks',userController.isLoggedIn,(req,res)=>{
		if (req.users) {
res.render('artworks',{users: req.users});
	}
	else{
		res.redirect("/artworks");
	}

	

});




router.get('/artworks',userController.isLoggedIn,(req,res)=>{
		if (req.users) {
res.render('artworks',{users: req.users});
	}
	else{
		res.redirect("/login");
	}
	
	

});













router.get('/home',userController.isLoggedIn,(req,res)=>{
	// console.log(req.username);

	if (req.users) {
res.render('home',{users: req.users});
	}
	else{
		res.redirect("/login");
	}
	
})

module.exports = router;
