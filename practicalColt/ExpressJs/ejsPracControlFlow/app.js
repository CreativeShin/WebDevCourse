var express = require('express');
var app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");

// request
app.get("/",function(req,res){
   res.render('home.ejs'); 
});

app.get("/dog/:animal",function(req,res){
   var animalName = req.params.animal;
   res.render("dog",{
      thingVar: animalName 
   });
});

app.get('/posts',function(req,res){
   var posts = [
      {title: "The Harry Potter", author: "J.K Rowling"},
      {title: "The Pot Lady", author: "Eustess Mary"},
      {title: "The Urgent Business", author: "Jacob Picasso"},
      {title: "Interesting Mail", author: "Kayen Mitchelle"},
      {title: "Supper", author: "Nheil Bradd"}
   ];
   
   res.render('posts',{
      posts: posts
   });
});

// listen
app.listen(process.env.PORT,process.env.IP, function(){
   console.log("Started the server"); 
});