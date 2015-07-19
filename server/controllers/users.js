// USERS CONTROLLER - SERVER SIDE

var mongoose = require('mongoose');

var User = mongoose.model('User');
var Post = mongoose.model('Post');
var Topic = mongoose.model('Topic');
var Comment = mongoose.model('Comment');




module.exports = (function(){

	return {

		show: function(req, res){
			User.find({}, function(err, results){

				if(err) {console.log('error in User controller')}
					else { res.json(results); }	
			})
		},

		showInfo: function(req, res){
			Topic.find({"user_id" : req.params.id}, function(err, results){

				if(err) {console.log('error in User controller')}
					else { res.json(results); }	
			})

		},

		showPost: function(req, res){


			Post.find({"user_id" : req.params.id}, function(err, results_post){

				if(err) {console.log('error in User controller')}
					else { res.json(results_post); }	
			})

		},

		showComment: function(req, res){


			Comment.find({"user_id" : req.params.id}, function(err, results_comment){

				if(err) {console.log('error in User controller')}
					else { res.json(results_comment); }	
			})

		},








	}


})();