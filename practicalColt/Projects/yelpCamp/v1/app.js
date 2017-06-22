var express= require('express');
var app = express();
// require body parser and do app.use(bodyParser.urlencoded({extended:true})
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
var campgrounds = [
            {name: "Salmon Creek", image: "https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg"},
            {name: "Granite Hill", image: "https://farm4.staticflickr.com/3742/10759552364_a796a5560a.jpg"},
            {name: "Mountain Goat's Rest", image: "https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg"},
            {name: "Salmon Creek", image: "https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg"},
            {name: "Granite Hill", image: "https://farm4.staticflickr.com/3742/10759552364_a796a5560a.jpg"},
            {name: "Mountain Goat's Rest", image: "https://farm3.staticflickr.com/2535/3823437635_c712decf64.jpg"}
        ];

app.set("view engine","ejs");

// Routes

app.get('/', function(req,res){
   res.render('landing'); 
});

app.get('/campgrounds',function(req,res){

        res.render('campgrounds',{campgrounds: campgrounds});
});

// new campground
app.get('/campgrounds/new',function(req,res){
   res.render('new'); 
});

// post route

app.post('/campgrounds', function(req,res){ //same as the get route due to a CONVENTION. Both are different.
// since we added POST we need "body-parser" to get DATA OUT OF IT
// step 1 Get data from form and add to campgrounds array

    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name,image: image};
    campgrounds.push(newCampground);
    
// step 2 Redirect back to campgrounds page
    res.redirect("/campgrounds"); //the default is to redirect as get request
});

// listen
app.listen(process.env.PORT,process.env.IP , function(){
   console.log("Yelp Camp is running"); 
});