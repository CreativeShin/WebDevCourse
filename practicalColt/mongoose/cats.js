var mongoose = require('mongoose');

// adding a new cat to the db
mongoose.connect("mongodb://localhost/cats_app");

var catSchema = new mongoose.Schema({
   name: String,
   age: Number,
   temprament: String
});

var Cat = mongoose.model("Cat",catSchema);
// two steps

// var george = new Cat({
//             name:"George",
//             age: 11,
//             temprament:"Grouchy"
//         });
        
// george.save(function(err,cat){
//     if(err){
//         console.log("Something went wrong");
//     } else{
//         console.log("Saved a cat to the db");
//         console.log(cat);
//     }
// });


// retrieve all cats from the db

Cat.find({},function(err,cats){
    if(err){
        console.log(err);
    }else{
        console.log(cats);
    }
})

// single step

Cat.create({
   name: "Snow White",
   age: 15,
   temprament:"bland"
},function(err,cat){
    if(err){
        console.log(err);
    }else{
        console.log(cat);
    }
});
