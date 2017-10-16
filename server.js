var express = require('express');
var app = express();
var PORT = 4900;
var morgan = require('morgan');
var bodyParser = require('body-parser');
// var todorouter = require('./todo/todoroutes');
// var categoryrouter = require('./category/categoryroutes');
// var userrouter = require('./user/userroutes');

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// serving public files from here
// app.use(express.static(__dirname + '/../public'));

// mount routes
// app.use('/todos', todorouter);
// app.use('/category', categoryrouter);
// app.use('/users', userrouter);


// express's automatic error handler middleware
app.use(function(err, req, res, next){

    res.status(501).json(err.message);

});


app.get('/', function(req, res){
	res.send('Hello World');
});

app.listen(PORT, function(){
    console.log('Express server started on port '+PORT+' !!!');
});