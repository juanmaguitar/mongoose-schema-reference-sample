require("./db");
var mongoose = require('mongoose');

var User = require('./models/User'),
    Post = require('./models/Post');


var alex = new User({
    name: "Alex"
});

var joe = new User({
    name: "Joe"
})

alex.save();
joe.save();

console.log ( joe._id )
console.log ( joe._id.toString() )
console.log ( new mongoose.mongo.ObjectId( joe._id.toString() )  )

var post = new Post({
    title: "Hello World",
    postedBy: alex._id,
    comments: [{
        text: "Nice post!",
        postedBy: joe._id
    }, {
        text: "Thanks :)",
        postedBy: alex._id
    }]
})

post.save(function(error) {
    if (!error) {
        Post.find({})
            .populate('postedBy')
            .populate('comments.postedBy')
            .exec(function(error, posts) {
                console.log(JSON.stringify(posts, null, "\t"))
            })
    }
});