var express = require('express');
var app = express(); // because express is a large package/lightweight(means more control) framework

app.get('/', function(req , res){
   res.send("Hi there!");  
}); //path and callback function with request and response objects as parameters 

app.get('/bye',function(req,res){
   res.send("Goodbye!!!"); 
});

app.get('/dog',function(req,res){
    console.log("SOMEONE MADE A REQUEST TO /DOG");
    res.send("MEOW!");
});


app.get('/r/:subreddit',function(req,res){
    console.log(req.params);
    var subreddit = req.params.subreddit;
   res.send("Welcome to a " +subreddit.toUpperCase()+ " subreddit"); 
});

app.get('/r/:subreddit/comment/:id',function(req,res){
    console.log(req.params);
   res.send("Welcome to a subreddit"); 
});


app.get('*',function(req,res){
    res.send("YOU ARE A STAR!!!");
});


// now we need express to listen to certain port and ip address

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started"); 
});
