var mongoose = require('mongoose');

var commentSchema = new mongoose.Schema({
        text: String,
        author: {
        //  we dont want the salt and hash table here that's why only using id
                id: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: 'User'
                },
                username: String
                // can only do this with a non relational db like mongo
        }
});

module.exports = mongoose.model('Comment', commentSchema);