var express= require('express');
var app = express();
var mongoose = require('mongoose');
var Campground = require('./models/campground');
var Comment = require('./models/comment');
var seedDB = require('./seeds');
var passport = require('passport');
var User= require('./models/user');
var localStrategy = require('passport-local');



mongoose.connect('mongodb://localhost/yelp_camp_v6');

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


app.get('/', function(req,res){
   res.render('landing'); 
});

// INDEX route
app.get('/campgrounds',function(req,res){
        // get all campgrounds from db
        console.log(req.user);
        Campground.find({}, function(err,allCampgrounds){
            if(err){
                console.log(err);
            }else{
                res.render('campgrounds/index',{campgrounds: allCampgrounds, currentUser: req.user})
            }
        });
        // res.render('campgrounds',{campgrounds: campgrounds});
});

// NEW campground

app.get('/campgrounds/new',function(req,res){
   res.render('campgrounds/new'); 
});

//CREATE route // post route

app.post('/campgrounds', function(req,res){ 
//same as the get route due to a CONVENTION. Both are different.
// since we added POST we need "body-parser" to get DATA OUT OF IT
// step 1 Get data from form and add to campgrounds array

    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {name: name,image: image, description: desc};
    
    // create a new campground and save to db
    // campgrounds.push(newCampground);
    
    Campground.create(newCampground, function(err,newlyCreated){
        if(err){
            console.log(err);
        }else{
    // step 2 Redirect back to campgrounds page
   //the default is to redirect as get request
              res.redirect("/campgrounds");
        }
    });
    

});

// SHOW route - shows info about one campground // needs to come after the new route or it wont fire up as campgrounds/:id 
app.get('/campgrounds/:id',function(req,res){
    // find campground with the provided id
    Campground.findById(req.params.id).populate('comments').exec( function (err,foundCampground){
        if(err){
            console.log(err);
        }else{
            console.log(foundCampground);
            res.render('campgrounds/show', {
                campground: foundCampground
            });
        }
    });
    // render show template with that campground
//   res.render('show');
});

// =================
// COMMENTS ROUTE
// =================

app.get('/campgrounds/:id/comments/new', isLoggedIn, function(req, res){
    // find campground by ID
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        }else{
              res.render('comments/new', {
                    campground:campground
              }); 
        }
    });
 
});

// comment post route

app.post('/campgrounds/:id/comments',isLoggedIn , function(req, res){
   Campground.findById(req.params.id, function(err, campground){
      if(err){
          console.log(err);
          res.redirect('/campgrounds');
      } else{
          Comment.create(req.body.comment, function(err, comment){
             if(err){
                 console.log(err);
             } else{
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect('/campgrounds/' + campground._id);
             }
          });
      }
   });
});


// AUTH Routes
// show register form
app.get('/register', function(req, res){
  res.render('register'); 
});

app.post('/register', function(req, res){
    var newUser = new User({username: req.body.username});
  User.register(newUser, req.body.password, function(err, user){
      if(err){
          console.log(err);
          return res.render('register');
      }
      passport.authenticate('local')(req, res, function(){
         res.redirect('/campgrounds'); 
      });
  }) ;
});

// show login form

app.get('/login', function(req, res){
    res.render('login');
})

app.post('/login',passport.authenticate('local', {
    successRedirect: '/campgrounds',
    failureRedirect:'/login'
}),function(req,res){
});

// logout
app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/campgrounds');
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
        res.redirect('/login');
}



// listen
app.listen(process.env.PORT,process.env.IP , function(){
   console.log("Yelp Camp is running"); 
});