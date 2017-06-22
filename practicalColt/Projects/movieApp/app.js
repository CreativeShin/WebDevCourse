var express = require('express');
var app = express();
var request = require('request');
app.set("view engine","ejs");

// Routes
app.get('/',function(req,res){
   res.render('search'); 
});

app.get('/result',function(req,res){
// SAPI API data
    var main = req.query.main.toLowerCase(); //data we get from the form
    var searchbox = req.query.searchbox.toLowerCase();
    var url = "https://swapi.co/api/" + main + "/?search=" + searchbox;
    
    request(url,function(error,response,body){
        if(!error && response.statusCode == 200){
            var mainData = JSON.parse(body);
            var data = mainData["results"][0];
            // console.log(data);
            res.render('result', {
                data:data
            });
        }
    });
});

// listen
app.listen(process.env.PORT,process.env.IP,function(){
    console.log("Movie app is working");
});