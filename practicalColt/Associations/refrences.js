var mongoose = require('mongoose');
var Post = require('./models/post.js');
var User = require('./models/user.js');

mongoose.connect('mongodb://localhost/blog_demo_2');



// User.create({
//     email: "bob@gmail.com",
//     name: "Bob Belcher"
// }, function(err, user){
//   if(err){
//       console.log(err);
//   }else{
//       console.log(user);
//   }
// });

// Post.create({
//     title: "You do it like this!",
//     content: "blah blah blah"
// }, function(err, post){
//     if(err){
//         console.log(err);
//     }else{
//         User.findOne({email: "bob@gmail.com"}, function(err, foundUser){
//             if(err){
//                 console.log(err);
//             }else{
//                     foundUser.posts.push(post);
//                   foundUser.save(function(err, data){
//                       if(err){
//                           console.log(err);
//                       } else{
//                           console.log(data);
//                       }
//                   });
//             }
//         });
//     }
// });

User.findOne({email: 'bob@gmail.com'}).populate("posts").exec(function(err,user){
  if(err){
      console.log(err);
  } else{
      console.log(user);
  }
});