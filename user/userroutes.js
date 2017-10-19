var express = require("express"),
    usermodel = require('./usermodel');


var userroute = express.Router();

userroute.route('/')
    .get(function(req, res, next) {
        usermodel.find({}, function(err, user) {
            if(user.length == 0) { return next(new Error("No users found")); }
            if(err){ return next(err); }
            res.status(200).json(user);

        });
    })
    .post(function(req, res, next) {
        usermodel.create(req.body, function(err, user) {
            if(err){ return next(err); }
            res.status(200).json(user);
        });

    })
    .delete(function(req, res, next) {
        usermodel.remove({}, function(err, user) {
            if(user.length == 0) { return next(new Error("No users found")); }
            if(err){ return next(err); }
            res.status(200).json(user);

        });
    })

// Routes that take id as a parameter

userroute.route('/:id')
    .get(function(req, res, next) {
        usermodel.findOne({_id: req.params.id}, function(err, user){
            if(!user) { return next(new Error("No user found by id")); }
            if(err){ return next(err); }
            res.status(200).json(user);

        });
    })
    .put(function(req, res, next){
        usermodel.findOneAndUpdate({_id: req.params.id}, req.body, function(err, user){
            if(!user) { return next(new Error("couldnt update, id not found")); }
            if(err){ return next(err); }
            res.status(200).json(user);
        });
    })
    .delete(function(req, res, next) {
        usermodel.findOneAndRemove({_id: req.params.id}, req.body, function(err, user) {
            if(!user) { return next(new Error("couldnt delete, id not found")); }
            if(err){ return next(err); }
            res.status(200).json(user);
        });
    })



/*route.get('/', function(req, res, next){
	res.status(200).json({msg: "it worked"});
})*/


module.exports = userroute;