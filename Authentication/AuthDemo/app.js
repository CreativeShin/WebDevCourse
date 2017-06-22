var express= require('express');
var bodyParser = require('body-parser');
var passport = require('passport');
var localStrategy = require('passport-local');
var passportLocalMongoose = require('passport-local-mongoose');
var User = require('./models/user');
// var expressSession = require('express-session');

var app = express();
var mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/auth_app_demo');

// app.use and app.set after app is defined
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));

// express session---------------------------------------------------------------------------->>>>>>>>>>>>>>>
// app.use(expressSession({
//     secret: "Rusty is the best dog", //the secret is used to encode and decode the sessions 
//     //sessions have encoded data, not human readable
//     resave: false, 
//     saveUninitialized: false

    
// })); //takes three objects

// ------------------------------------------------------------------------------------------->>>>>>>>>>>>>

// >>>>>>>>>>>>>>>>>>>>>>>>>>==============different way to use express session ================<<<<<<<<<<<<<<<<<<<<<<<<<<
app.use(require('express-session')({
    secret: "Rusty is a good dog", //used to encode and decode the sessions
    resave: false,
    saveUninitialized: false
}));
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>======================================<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

// For login
passport.use(new localStrategy(User.authenticate()));
// use passport
// ---------------------------------
app.use(passport.initialize());
app.use(passport.session());
// --------------------------------

// serializeUser which comes with passport local mongoose-------<<<<<<<<<<<<<<<<<<<<<
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
// ----------------------------------------------------<<<<<<<<<<<<<<<<<<<

// ROUTES ==========================================

// root route

app.get('/', function(req, res){
   res.render('home'); 
});


// secret route

app.get('/secret', isLoggedIn, function(req, res){
   res.render('secret'); 
});

// register
app.get('/register', function(req, res){
   res.render('register') ;
});

// POST route
app.post('/register', function(req, res){
//   register User
    User.register(new User({username: req.body.username}), req.body.password, function(err, user){
           if(err){
               console.log(err);
            //   short circuit it
            return res.render('register');
           } 
        // if there is no error
        passport.authenticate('local')(req, res, function(){
           res.redirect('/secret'); 
        });
    });
});

// login
app.get('/login', function(req, res){
   res.render('login'); 
});

// POST login

app.post('/login',passport.authenticate('local', {
    successRedirect: '/secret',
    failureRedirect: '/login'
}) ,function(req,res){
// using middleware
});

// Logout
app.get('/logout', function(req,res){
    req.logout(); //using passport that's all we need to do..
    res.redirect('/');
});

// middleware isLoggedIn

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }else{
        res.redirect('/login');
    }
}


// LISTEN--------------------------

app.listen(process.env.PORT, process.env.IP, function(){
   console.log('The server is up and running!'); 
});
