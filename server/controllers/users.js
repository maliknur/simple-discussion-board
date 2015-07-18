// USERS CONTROLLER - SERVER SIDE

var mongoose = require('mongoose');

var User = mongoose.model('User');


module.exports = (function(){

	return {

		show: function(req, res){
			User.find({}, function(err, results){

				if(err) {console.log('error in User controller')}
					else { res.json(results); }	
			})
		},

		add: function(req, res){
			
		
			var newUser = new User({
				name: req.body.name 
			})

			newUser.save(function(err){
				if(!err){console.log('user created')}
					else{ console.log(err); }

			})

		}


	}


})();