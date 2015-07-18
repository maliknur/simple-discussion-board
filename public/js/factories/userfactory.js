// USER FACTORY - FRONT SIDE

myApp.controllers.factory('UserFactory', function($http){

	var factory = {};

	var users = [];


	factory.getUsers = function(callback){
		$http
		.get('/users')
		.success(function(output){
			users = output;
		})
		.finally(function(){
			callback(users);
		})
	}

	factory.addUser = function(newUser, callback){

		console.log(newUser);
		
		$http.post('/users/add', newUser);
		callback();
	}

	return factory;
	
})