const express		= require("express");
const hbs			= require("hbs");
const fs			= require("fs");

const port 			= process.env.PORT || 3000;
const app			= express();


hbs.registerPartials(__dirname + "/views/partials");
app.set("view engine", "hbs");

// Middleware Setup
app.use((req,res,next) =>{
	var now = new Date().toString();
	var log = (` ${now}: ${req.method} ${req.url}`);
	

	console.log(log);
	fs.appendFile("server.log", log + "\n");
	next();
});

// app.use((req,res,next) => {
// 	res.render("maintenance");
// })
app.use(express.static(__dirname + "/public"));



hbs.registerHelper("getCurrentYear", () => {
	return new Date().getFullYear();
});

hbs.registerHelper("yellIt", (text) => {
	return text.toUpperCase();
});


app.get("/", (req,res) => {
	res.render("index",{
		pageTitle: "Home Page",
	});
	// res.send({
	// 	name: "Ty",
	// 	likes: [
	// 		"Sports",
	// 		"Photography",
	// 		"Traveling"
	// 	]
	// });
});

app.get("/about", (req,res) => {
	res.render("about", {
		pageTitle: "About Page",
	});
})

app.get("/gallery", (req,res) => {
	res.render("gallery");
});


app.get("/bad", (req,res) => {
	res.send({
		company: "Microsoft/Apple",
		errorMessage: "Warning: ERROR your computer is about to explode!"
	});
})




app.listen(port, (req,res) => {
	console.log("Server Deployed");
});