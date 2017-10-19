var mongoose = require('mongoose');
// Category = require('./categories/categoriesmodel'),
var User = require('../user/usermodel');



// another connection format
mongoose.connect("mongodb://localhost/eventtra");



var Schema = mongoose.Schema;

var PostSchema = new Schema({

    title: { type: String, required: true },
    post: { type: String, required: true },
    postedBy: {
           type: mongoose.Schema.Types.ObjectId,
           ref: 'User'
       },
    //    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    comments: { type: String, required: true },
    date_time: {
        type: Date,
        default: Date.now
    },




});


var Post = mongoose.model('posts', PostSchema);

module.exports = Post;