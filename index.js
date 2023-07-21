const express = require("express");
const app = express();
const path = require('path');
const hbs = require('hbs');
const dotenv = require("dotenv");
const port = process.env.PORT || 5000;
const templatePath= path.join(__dirname, "/templates/views");
const staticPath = path.join(__dirname, "public"); 
const partialsPath = path.join(__dirname, "/templates/partials");
const mysql = require("./connection").con;
const cookieParser = require("cookie-parser");


app.set('view engine', 'hbs');
app.use(express.static(staticPath));
app.set('views', templatePath);
hbs.registerPartials(partialsPath);
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cookieParser());
// Define routes

app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));




// Database




// Server
app.listen(port,(err)=>{

	if(err) throw err;
	console.log(`Server is running in port '${port}'`);
});