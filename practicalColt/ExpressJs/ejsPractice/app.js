var express = require('express');
var app = express();

//requests

app.get('/', function(req,res){
   res.send("<h1>Welcome to my homepage!"); 
});

app.get('/home', function(req,res){
   res.render("home.ejs"); 
});

app.get('/country/:countryName',function(req,res){
    var kuni = req.params.countryName;
    res.render("countries.ejs",{
       someCountry: kuni 
    });
    
});

//  listen
app.listen(process.env.PORT,process.env.IP, function(){
    console.log("The server started");
})