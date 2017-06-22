// Require express and use expressRouter

var express= require('express');
var router = express.Router();
var Campground = require("../models/campground");


// INDEX route
router.get('/',function(req,res){
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

router.get('/new',isLoggedIn,function(req,res){
   res.render('campgrounds/new'); 
});

//CREATE route // post route

router.post('/',isLoggedIn , function(req,res){ 

    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
        var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newCampground = {name: name,image: image, description: desc, author: author};

    // console.log(req.user);
    
    Campground.create(newCampground,function(err,newlyCreated){
        if(err){
            console.log(err);
        }else{
            console.log(newlyCreated);
              res.redirect("/campgrounds");
        }
    });
    

});

// SHOW route - shows info about one campground // needs to come after the new route or it wont fire up as campgrounds/:id 
router.get('/:id',function(req,res){
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

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
        res.redirect('/login');
}

module.exports = router;