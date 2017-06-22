var mongoose = require('mongoose');
var Campground = require('./models/campground');
var Comment = require('./models/comment');

var data = [
            {
                name: 'Scarlet Camp',
                image:'https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg',
                description: "The place of Dragons."
            },
            {
                name: 'Kathmandu Camp',
                image:'https://farm3.staticflickr.com/2352/2493916483_d2c89da293.jpg',
                description: "Embrace Solitude."
            },
            {
                name: 'Umbra',
                image:'https://farm9.staticflickr.com/8193/8077900378_baca41b1fd.jpg',
                description: 'Night Glory..'
            },
            {
                name: 'The Genova',
                image: 'https://farm1.staticflickr.com/651/21623805988_8687281071.jpg',
                description: 'The unknown.'
            }
        ];

function seedDB(){
    // Remove all campgrounds
    Campground.remove({}, function(err){
       if(err){
           console.log(err);
       } else{
           console.log("Removed successfully!");
               // Add a few campgrounds
    
            data.forEach(function (seed){
                Campground.create(seed, function(err, campground){
               if(err){
                   console.log(err);
               } else{
                   console.log('added a campground');
                //   create comments on each campground
                    Comment.create({
                        text: 'this place is great but I need internet...',
                        author: 'Homer'
                    }, function(err, comment){
                        if(err){
                            console.log(err);
                        }else{
                            campground.comments.push(comment);
                            campground.save();
                            console.log('added comment');
                        }
                    });
               }
                }); 
            });
       }
    });
    

}

module.exports = seedDB;