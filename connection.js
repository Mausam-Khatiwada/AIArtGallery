const mysql = require("mysql");
const dotenv = require("dotenv");



dotenv.config({
	path:"./.env",
	
})

const con = mysql.createConnection({

	host: process.env.DATABASE_HOST,
	user: process.env.DATABASE_USER,
	password: process.env.DATABASE_PASS,
	database: process.env.DATABASE,
});



con.connect((err)=>{
	if (err) throw err; 
	console.log("Connection created Successfully!");
})


module.exports.con=con;