'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
	
	.factory('TopicFactory', function($http, $location){

	var factory = {};

	var topics = [];

	var topic = {};

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

	factory.getTopicById = function(tid, callback){
		$http
		.get('/getTopicById/' + tid)
		.success(function(output){
				
			topic = output;
			
			callback(topic);

		})
		
		
	}

// ADD TOPIC 
	factory.addTopic = function(newTopic, callback){
		
		$http.post('/topics/add', newTopic);
		callback();

	}

// ADD POST
	factory.addPost = function(newPost, callback){
		var topic_id = newPost.topic_id;
		$http.post('/topics/post/'+topic_id, newPost);
		callback();
	}


// ADD COMMENT
	
	factory.addComment = function(newComment, callback){
		
		// var post_id = newComment.post_id;


		var post_id = newComment.post_id;

		$http.post('/post/comment/'+post_id, newComment);
		callback();
	}


	return factory;

})


// *************** CONTROLLERS **********************

  
  .controller('HomeCtrl', ['$scope', 'TopicFactory', '$location', '$routeParams',  function($scope, TopicFactory, $location,  $routeParams) {


  		// SHOW ALL TOPICS


	TopicFactory.getTopics(function(data){
		$scope.topics = data;
	
		
	})



		// ADD TOPIC
	$scope.addTopic = function(){
		


		TopicFactory.addTopic($scope.newTopic, function(){
			TopicFactory.getTopics(function(data){

			})

			$scope.newTopic = {};
		})
	}



  }])



  .controller('TopicController', ['$scope', '$http', '$routeParams', 'TopicFactory', function($scope, $http, $routeParams, TopicFactory){

		

		
		// SHOW TOPIC BY ID

		var tid = $routeParams.id;

		TopicFactory.getTopicById(tid, function(topic){
	
			$scope.topic = topic;
		
			

		})
		


		


		// ADD POST UNDER THE TOPIC
		$scope.addPost = function(){

			$scope.newPost.topic_id = tid;


			TopicFactory.addPost($scope.newPost, function(){
			
				
			$scope.newPost = {};
		})

	}


	// ADD COMMENT UNDER THE POST

		var newComment = $scope.newComment;
	

		$scope.addComment = function(newComment){

			console.log(newComment);

			TopicFactory.addComment(newComment, function(){
			
				
			$scope.newComment = {};
		})

	}
		
		
	


  }])



  .controller('ArticlesCtrl', ['$scope', '$http', function($scope, $http) {
  	$scope.loading = true;
  	
 

  	$scope.error = null;

		// Call the back-end API which will be authenticated using our session token
		$http({method: 'GET', url: '/articles'}).
			success(function(data, status, headers, config) {
				//The API call to the back-end was successful (i.e. a valid session)
				$scope.articles = data;
				$scope.loading = false;
			}).
			error(function(data, status, headers, config) {
				$scope.error = {
					message: "The API call to the back-end was not successful. Make sure that your back-end verifies the token.",
					link: "https://app.userapp.io/#/docs/libs/angularjs/#back-end"
				};
				$scope.loading = false;
			});
  }]);


  
