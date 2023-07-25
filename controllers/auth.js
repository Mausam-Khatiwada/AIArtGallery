
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
	if (password!=result[0].password) {

		return res.status(401).render('login',{
		msg: "Oops! Invalid credentials. Please enter correct data!",
		msg_type:"error",

	});
	}
	else{
		console.log("This is admin speaking!!!");
		
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



exports.logout= async(req,res)=>{


res.cookie("Mausam","logout",{

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

