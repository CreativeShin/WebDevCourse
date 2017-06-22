var express = require("express");
var app = express();

app.get("/",function(req,res){
   res.send("Hi there, welcome to my assignment!"); 
});

app.get('/speak/:animal',function(req,res){
//   var animal = req.params.animal;
//   if(animal === "cow"){
//       res.send("The " +animal+ " says 'Moo'.");
//   } else if(animal === "pig"){
//       res.send("The " +animal+ " says 'Oink'.");
//   }else if(animal === "dog"){
//       res.send("The " +animal+ " says 'Woof Woof'.");
//   }
// BETTER WAY
    var animal = req.params.animal.toLowerCase();
    var sound = {
        cow: "Moo",
        dog: "Woof Woof!",
        pig: "Oink",
    }
    res.send("The " + animal + " says '" + sound[animal] +"'");
});

app.get('/repeat/:word/:num',function(req,res){
    // console.log(Number(req.params.num));
    var word = req.params.word;
    var num = Number(req.params.num);
    var string = "";
    console.log(num,word);
    for(var i=0; i<num;i++){
        string += word + " ";
    }
    res.send(string);
});

// * for all others

app.get('/*',function(req,res){
   res.send("Sorry, page not found...What are you doing with your life?");
});

// listen
app.listen(process.env.PORT, process.env.IP,function(){
   console.log("The server started"); 
});