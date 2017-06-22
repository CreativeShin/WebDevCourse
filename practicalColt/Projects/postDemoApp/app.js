var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine", "ejs");
var friends = ['Makishima Shougo', 'Kazuma Yagami', 'Gintama', 'John Oldman'];

app.get("/", function(req,res){
   res.render("home"); 
});
// post route

app.post('/addfriend',function(req,res){
   var newFriend = req.body.newfriend;
   friends.push(newFriend);
   res.redirect('friends');
});

// friends route
app.get('/friends',function(req,res){
   res.render('friends',{
       friends:friends
   }); 
});


// listen
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("started the server");
})