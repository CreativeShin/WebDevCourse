var express= require('express');
var app = express();
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/yelp_camp');

// require body parser and do app.use(bodyParser.urlencoded({extended:true})
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));

// Schema Setup
var campgroundSchema = new mongoose.Schema({
   name: String,
   image: String,
   description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);


app.set("view engine","ejs");

// Routes


app.get('/', function(req,res){
   res.render('landing'); 
});

// INDEX route
app.get('/campgrounds',function(req,res){
        // get all campgrounds from db
        Campground.find({}, function(err,allCampgrounds){
            if(err){
                console.log(err);
            }else{
                res.render('index',{campgrounds: allCampgrounds})
            }
        });
        // res.render('campgrounds',{campgrounds: campgrounds});
});

// NEW campground

app.get('/campgrounds/new',function(req,res){
   res.render('new'); 
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
    Campground.findById(req.params.id, function (err,foundCampground){
        if(err){
            console.log(err);
        }else{
            res.render('show', {
                campground: foundCampground
            });
        }
    });
    // render show template with that campground
//   res.render('show');
});

// listen
app.listen(process.env.PORT,process.env.IP , function(){
   console.log("Yelp Camp is running"); 
});