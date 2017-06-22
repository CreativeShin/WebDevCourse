// Require express and use expressRouter

var express= require('express');
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");

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

router.get('/new',middleware.isLoggedIn,function(req,res){
   res.render('campgrounds/new'); 
});

//CREATE route // post route

router.post('/',middleware.isLoggedIn , function(req,res){ 

    var name = req.body.name;
    var image = req.body.image;
    var image = req.body.image;
    var price = req.body.price;
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

// ===============================================AUTHORIZATION====================================================
// EDIT CAMPGROUND ROUTE
router.get('/:id/edit', middleware.checkCampgroundOwnership , function(req, res){
    // if user is logged in
    
         Campground.findById(req.params.id, function(err, foundCampground){
                     res.render('campgrounds/edit', {campground: foundCampground});
        });
    });

// UPDATE CAMPGROUND ROUTE

router.put('/:id', middleware.checkCampgroundOwnership ,function(req, res){
    // find and update the correct campground
        Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err,updatedCampground ){
            if(err){
                res.redirect('/campgrounds');
            }else{
                res.redirect('/campgrounds/'+ req.params.id);
            }
        });
    // redirect somewhere
    
});

// DESTROY route

router.delete('/:id',middleware.checkCampgroundOwnership ,function(req, res){
   Campground.findByIdAndRemove(req.params.id, function(err){
       if(err){
           console.log(err);
           res.redirect('/campgrounds');
       }else{
           res.redirect('/campgrounds');
       }
   });
});



module.exports = router;