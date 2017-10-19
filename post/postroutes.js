var express = require("express"),
    postmodel = require('./postmodel');



var postroute = express.Router();

postroute.route('/')
    .get(function(req, res, next) {
        postmodel.find({}, function(err, posts) {
            if(posts.length == 0) { return next(new Error("No posts found")); }
            if(err){ return next(err); }
            res.status(200).json(posts);

        });
    })
    .post(function(req, res, next) {
        postmodel.create(req.body, function(err, posts) {
            if(err){ return next(err); }
            res.status(200).json(posts);
        });

    })
    .delete(function(req, res, next) {
        postmodel.remove({}, function(err, posts) {
            if(posts.length == 0) { return next(new Error("No posts found")); }
            if(err){ return next(err); }
            res.status(200).json(posts);

        });
    })

// Routes that take id as a parameter

postroute.route('/:id')
    .get(function(req, res, next) {
        postmodel.findOne({_id: req.params.id}, function(err, posts){
            if(!posts) { return next(new Error("No post found by id")); }
            if(err){ return next(err); }
            res.status(200).json(posts);

        });
    })
    .put(function(req, res, next){
        postmodel.findOneAndUpdate({_id: req.params.id}, req.body, function(err, posts){
            if(!posts) { return next(new Error("couldnt update, id not found")); }
            if(err){ return next(err); }
            res.status(200).json(posts);
        });
    })
    .delete(function(req, res, next) {
        postmodel.findOneAndRemove({_id: req.params.id}, req.body, function(err, posts) {
            if(!posts) { return next(new Error("couldnt delete, id not found")); }
            if(err){ return next(err); }
            res.status(200).json(posts);
        });
    })



/*route.get('/', function(req, res, next){
	res.status(200).json({msg: "it worked"});
})*/


module.exports = postroute;