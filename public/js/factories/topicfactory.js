// TOPIC FACTORY - FRONT SIDE


myApp.controllers.factory('TopicFactory', function($http){

	var factory = {};

	var topics = [];

	factory.getTopics = function(callback){
		$http
		.get('/topics')
		.success(function(output){
			topics = output;
		})
		.finally(function(){
			callback(topics);
		})
	}


	factory.addTopic = function(newTopic, callback){
		$http.post('/topics/add', newTopic);
		callback();

	}

	return factory;

})