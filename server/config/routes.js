// ROUTES - SERVER SIDE


var users = require('./../controllers/users.js');
var categories = require('./../controllers/categories.js');
var topics = require('./../controllers/topics.js');

module.exports = function(app){
	
	app.get('/topics', function(req, res){
		topics.show(req, res);
	})

	app.get('/categories', function(req, res){
		categories.show(req, res);
	})

	app.get('/getTopicById/:id', function(req, res){
		topics.getbyid(req, res);
	})


	app.get('/users', function(req, res){
		users.show(req, res);
	})

	app.get('categories', function(req, res){
		categories.show(req, res);
	})

	app.post('/topics/add', function(req, res){
		topics.add(req, res);
	})

	app.post('/topics/post/:id', function(req, res){
		topics.addPost(req, res);
	})

	app.post('/post/comment/:id', function(req, res){
		topics.addComment(req, res);
	})


	app.post('/post/like/:id', function(req, res){
		topics.addLike(req, res);
	})

	app.post('/post/dislike/:id', function(req, res){
		topics.addDislike(req, res);
	})

}