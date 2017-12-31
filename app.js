const express      = require("express"),
	  app          = express(),
	  mongoose     = require("mongoose"),
	  cookieParser = require("cookie-parser"),
	  session	   = require("express-session"),
	  flash        = require("connect-flash"),
	  methodOverride = require("method-override"),
	  bodyParser     = require("body-parser");

const Cart           = require("./classes/cart.js"),
	  indexRoutes    = require("./routes");

const PORT = process.env.PORT || 8180,
	  IP = process.env.IP || "0.0.0.0",
	  DB = process.env.DB || "mongodb://localhost/arbi";


// Define a new cart
app.locals.cart = new Cart();

// mongoose.connect(DB);


app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.use(cookieParser("secret"));
app.use(session({
	cookie: { maxAge: 60000 },
	saveUninitialized: true,
	resave: 'true',
	secret: 'secet'
}));
app.use(flash());
app.use((req, res, next) => {
	res.locals.success = req.flash("success");
	res.locals.failure = req.flash("failure");
	next();
});

app.use(express.static("public"));
app.use("/", indexRoutes);

app.use((req, res, next) => {
	res.locals.cart = app.locals.cart;
	next();
});



app.listen(PORT, IP, () => {
	console.log("Don't go to http://localhost:8180");
});