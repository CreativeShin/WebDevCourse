var express= require('express');
var app = express();
var mongoose = require('mongoose');
var Campground = require('./models/campground');
var Comment = require('./models/comment');
var seedDB = require('./seeds');
var passport = require('passport');
var User= require('./models/user');
var localStrategy = require('passport-local');

var commentRoutes = require('./routes/comments'),
    campgroundRoutes = require('./routes/campgrounds'),
    authRoutes = require('./routes/index');
    



mongoose.connect('mongodb://localhost/yelp_camp_v7');

// require body parser and do app.use(bodyParser.urlencoded({extended:true})
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));

console.log(__dirname);


app.set("view engine","ejs");
app.use(express.static(__dirname + '/public'));
seedDB(); //Initialize seedDB

// PASSPORT Congiguration
app.use(require("express-session")({
    secret: "Rusty is a cute dog",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
    res.locals.currentUser = req.user
    next();
    
});

// Routes
app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);
app.use("/",authRoutes);



// listen
app.listen(process.env.PORT,process.env.IP , function(){
   console.log("Yelp Camp is running"); 
});