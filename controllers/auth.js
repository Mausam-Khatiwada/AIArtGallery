
const mysql = require("../connection").con;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const {promisify} = require("util");
exports.login = async(req,res)=>{


try{

const {email,role,password}=req.body;
if (!email || !role|| !password) {
	return res.status(400).render('login',{
		msg: "Oops! Invalid credentials!",
		msg_type:"error",

	});
}


	if (role==='admin') {

mysql.query('select * from admin where email=?',[email],async(error,result)=>{

console.log(result);
if(result.length<=0){

return res.status(401).render('login',{
		msg: "Oops! Invalid credentials. Please enter correct data!",
		msg_type:"error",

	});

}
else{
		if(!(await bcrypt.compare(password, result[0].password))){

return res.status(401).render('login',{
		msg: "Oops! Invalid credentials. Please enter correct data!",
		msg_type:"error",

	});

	}
	else{
		console.log("This is admin speaking!!!");
		
			const id = result[0].id;
		const token=jwt.sign({id:id},process.env.JWT_SECRET,{
			expiresIn:process.env.JWT_EXPIRES_IN,
		});
		console.log("The Token is" + token);
		const cookieOptions={
			expires: new Date
			(Date.now()+
				process.env.JWT_COOKIE_EXPIRES*24*60*60*1000
				),

			httpOnly: true,
					}
	res.cookie("Admin",token,cookieOptions);
	res.status(200).redirect("/dashboard");

	}



}







});
	}
	else{



mysql.query('select * from users where email=?',[email],async(error,result)=>{
console.log(result);

if(result.length<=0){

return res.status(401).render('login',{
		msg: "Oops! Invalid credentials. Please enter correct data!",
		msg_type:"error",

	});

}
else{
	if(!(await bcrypt.compare(password, result[0].password))){

return res.status(401).render('login',{
		msg: "Oops! Invalid credentials. Please enter correct data!",
		msg_type:"error",

	});

	}
	else{

		const id = result[0].id;
		const token=jwt.sign({id:id},process.env.JWT_SECRET,{
			expiresIn:process.env.JWT_EXPIRES_IN,
		});
		console.log("The Token is" + token);
		const cookieOptions={
			expires: new Date
			(Date.now()+
				process.env.JWT_COOKIE_EXPIRES*24*60*60*1000
				),

			httpOnly: true,
					}
	res.cookie("Mausam",token,cookieOptions);
	res.status(200).redirect("/home");
	}
}
});
	}








}
catch(error){
	console.log(error);
}

}






exports.signup = (req,res)=>{

// const username = req.body.username;
// const email = req.body.email;
// const country = req.body.country;
// const role = req.body.role;
// const password = req.body.password;
// const confirmpassword = req.body.confirmpassword;


const {username,fullname,email,country,role,password,confirmpassword} = req.body;

mysql.query('SELECT username From users WHERE username = ?',[username], async(error, results)=>{

if (error) {

		console.log(error);

	}
	if (results.length>0) {
		return res.render('signup',{

			message: '*username is already registered!'
		})
	}



mysql.query('SELECT email From users WHERE email = ?',[email], async(error, results)=>{
	if (error) {

		console.log(error);

	}
	if (results.length>0) {
		return res.render('signup',{

			message: '*Email is already registered!'
		})
	}
	else if(password !== confirmpassword){
		return res.render('signup',{

			message: '*Passwords do not match!'
		})
	}



	let hashedPassword = await bcrypt.hash(password, 8);
	console.log(hashedPassword);



mysql.query('INSERT INTO users SET ?',{username:username,fullname:fullname, email:email, country:country, password:hashedPassword}, (error, results)=>{
if (error) {
	console.log(error);
}
else{
	return res.render("signup",{
		registermessage: 'User registered!'
	})
}
})

});
});

}

exports.isLoggedIn = async(req,res,next)=>{
	// req.username="Check login..."
	// next();

	// console.log(req.cookies);
	if (req.cookies.Mausam) {
try{
const decode = await promisify(jwt.verify)
(req.cookies.Mausam, process.env.JWT_SECRET);
	
	// console.log(decode);

	mysql.query("select * from users where id=?",[decode.id],(err,results)=>{
		 // console.log(results[0].id);

		if (!results) {
			return next();
		}
		req.users = results[0];
		return next();


	});
	}
catch(error){
	console.log(error);
	return next();
}
}
	else{
		next();
	}
};
exports.isAdminLoggedIn = async(req,res,next)=>{
	if (req.cookies.Admin) {
		try{
const decode = await promisify(jwt.verify)
(req.cookies.Admin, process.env.JWT_SECRET);
	
	// console.log(decode);

	mysql.query("select * from admin where id=?",[decode.id],(err,results)=>{
		 // console.log(results[0].id);

		if (!results) {
			return next();
		}
		req.admin = results[0];
		return next();


	});
	}
catch(error){
	console.log(error);
	return next();
}
}
	else{
		next();
	}
};
	




exports.logout= async(req,res)=>{
res.cookie("Mausam","logout",{
expires: new Date(Date.now()+2*1000),
httpOnly:true
});
res.status(200).redirect("/");
}
exports.adminLogout= async(req,res)=>{
res.cookie("Admin","logout",{
expires: new Date(Date.now()+2*1000),
httpOnly:true
});
res.status(200).redirect("/");
}


// Function to handle file upload
exports.uploadPicture = (req, res) => {
  // Access the uploaded file details
  const file = req.file;

  // Handle further processing or response
  // For example, you can store the file details in the database

  res.status(200).send("File uploaded successfully");
};

exports.countUsers = (req,res,next)=>{
	mysql.query('SELECT COUNT(*) as userCount FROM users', (err, results) => {
  if (err) {
    console.error('Error executing query:', err);
    return;
  }
if (results) {
	  const userCount = results[0].userCount;
	   req.userCount = userCount;
  console.log('Number of users in the database:', userCount);
  next();
}
});
}
exports.countAdmin = (req,res,next)=>{
	mysql.query('SELECT COUNT(*) as adminCount FROM admin', (err, results) => {
  if (err) {
    console.error('Error executing query:', err);
    return;
  }
if (results) {
	  const adminCount = results[0].adminCount;
	   req.adminCount = adminCount;
  console.log('Number of admin in the database:', adminCount);
  next();
}
});
}

exports.countArtworks = (req,res,next)=>{
	mysql.query('SELECT COUNT(*) as artworkCount FROM artwork', (err, results) => {
  if (err) {
    console.error('Error executing query:', err);
    return;
  }
if (results) {
	  const artworkCount = results[0].artworkCount;
	   req.artworkCount = artworkCount;
  console.log('Number of artwork in the database:', artworkCount);
  next();
}
});
}

exports.getUsers = (req,res,next)=>{

mysql.query('SELECT * from users',(err,result)=>{


if (err) {
	console.log(err);
}
else{
const getUsers = result;
console.log(getUsers)
req.getUsers=getUsers;
next();
}


})

}

exports.addReview = (req,res)=>{


const {username,fullname,review} = req.body;
mysql.query('SELECT username From reviews WHERE username = ?',[username], async(error, results)=>{
if (error) {

		console.log(error);

	}
	if (results.length>0) {
			console.log("*You have already reviewed!")

		return res.redirect('/home');
	}
	else{
		mysql.query('INSERT INTO reviews SET ?',{username:username,fullname:fullname, review:review}, (error, results)=>{
if (error) {
	console.log(error);
}
else{
	console.log("Review added successfully!")
	res.redirect('/home')
}
})
	}


})
}

exports.getReviews = (req,res,next)=>{
	mysql.query('SELECT * from reviews',(err,result)=>{
		if (err) {
			console.log(err);
		}
		else{
			const getReviews = result;
			console.log(getReviews)
			req.getReviews=getReviews;
			next();
		}

})
}

exports.deleteReview = async (reviewId) => {
  try {
    // First, fetch the review's data to get any necessary details
    const reviews = await new Promise((resolve, reject) => {
      mysql.query('SELECT review, id FROM reviews WHERE id = ?', [reviewId], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results[0]);
        }
      });
    });

    if (!reviews) {
      throw new Error('Review not found');
    }

    // Delete the review from the database
    await new Promise((resolve, reject) => {
      mysql.query('DELETE FROM reviews WHERE id = ?', [reviewId], (error, results) => {
        if (error) {
          reject(error);
        } else {
          console.log('Review deleted');
          resolve();
        }
      });
    });


  } catch (err) {
    console.error('Unexpected error:', err);
    throw err;
  }
};



