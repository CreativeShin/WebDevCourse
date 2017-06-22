var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");

var contacts = ["Lisa","Lindsey","Lulu","Lo","Lala"];
// root
app.get('/', function(req,res){
   res.render('home',{
       contacts:contacts
   }); 
});

// post 

app.post('/contactinfo',function(req,res){
      var newContact = req.body.contactname;
      contacts.push(newContact);
      res.redirect('/'); //the root route url

});

// listen

app.listen(process.env.PORT,process.envIP,function(){
   console.log("The server is running."); 
});
