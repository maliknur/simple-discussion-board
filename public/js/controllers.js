'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
	
	.factory('TopicFactory', function($http, $location){

	var factory = {};

	var topics = {};

	var topic = {};

	var categories = {};

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

	factory.getCategories = function(callback){
		$http
		.get('/categories')
		.success(function(output){
			categories = output;
		})
		.finally(function(){
			callback(categories);
		})
	}



	factory.getTopicById = function(tid, callback){
		$http
		.get('/getTopicById/' + tid)
		.success(function(output){
				
			topic = output;
		})
		.finally(function(){
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
		$http.post('/topics/post/'+topic_id, newPost)
		.success(function(){

		callback();
			
		})
		

	}

// ADD COMMENT
	
	factory.addComment = function(newComment, callback){
		
		// var post_id = newComment.post_id;


		var post_id = newComment.post_id;

		$http.post('/post/comment/'+post_id, newComment)
		.success(function(){
			
			callback();
		})
	}


// ADD LIKE FACTORY


		factory.addLike = function(postLike, callback){

			var post_id = postLike._id;
			postLike.like += 1;

			$http.post('/post/like/'+post_id, postLike);
			callback();


		}



// ADD DISLIKE FACTORY


		factory.addDislike = function(postDislike, callback){

			var post_id = postDislike._id;
			postDislike.dislike += 1;

			$http.post('/post/dislike/'+post_id, postDislike);
			callback();


		}			


	return factory;

})

	
	//  USER FACTORY
	.factory('UserFactory', function($http){

		var factory = {};
		var userinfo = {};
		var user_post = {};
		var user_comment={};


		
		factory.getUserById = function(user_id, callback){
			$http
			.get('/getUserById/' + user_id)
			.success(function(output){
					
				userinfo = output;
				
			})
			.finally(function(){
				callback(userinfo);
			})
				
		}


		factory.getUserPost = function(user_id, callback){
			$http
			.get('/getUserPost/' + user_id)
			.success(function(output_post){
					
			
				user_post = output_post;
			})
			.finally(function(){
				callback(user_post);
			})
				
		}

		factory.getUserComment = function(user_id, callback){
			$http
			.get('/getUserComment/' + user_id)
			.success(function(output_comment){
					
			
				user_comment = output_comment;
			})
			.finally(function(){
				callback(user_comment);
			})
				
		}



		return factory;
	})





// *************** CONTROLLERS **********************

  .controller('UserCtrl', ['$scope', 'UserFactory', '$routeParams', function($scope, UserFactory, $routeParams){

  		var user_id = $routeParams.id;

		UserFactory.getUserById(user_id, function(data){
			$scope.userinfo = data;
		
		})	

		UserFactory.getUserPost(user_id, function(data){
			$scope.user_post= data;
			
		})

		UserFactory.getUserComment(user_id, function(data){
			$scope.user_comment= data;
			
		})

  } ])


// HOME CONTROLLER

  .controller('HomeCtrl', ['$scope', 'TopicFactory', 'UserFactory', '$location', '$routeParams',  function($scope, TopicFactory, UserFactory, $location, $routeParams) {


  		// SHOW ALL TOPICS


	TopicFactory.getTopics(function(data){
		$scope.topics = data;
	
		
	})

		// SHOW ALL CATEGORIES

	TopicFactory.getCategories(function(data){
		$scope.categories = data;
	})







		// ADD TOPIC
	$scope.addTopic = function(){
		


		TopicFactory.addTopic($scope.newTopic, function(){
			
			TopicFactory.getTopics(function(data){
				$scope.topics = data;
			})

			$scope.newTopic = {};
		})
	}



  }])


// TOPIC CONTROLLER

  .controller('TopicController', ['$scope', '$http', '$routeParams', 'TopicFactory', function($scope, $http, $routeParams, TopicFactory){

		

		
		// SHOW TOPIC BY ID

		var tid = $routeParams.id;

		TopicFactory.getTopicById(tid, function(topic){
	
			$scope.topic = topic;
		
			

		})
		


		


		// ADD POST UNDER THE TOPIC
		$scope.addPost = function(topic){

			$scope.newPost.topic_id = tid;

			var topic_id = topic._id;


			TopicFactory.addPost($scope.newPost, function(){
				
				TopicFactory.getTopicById(topic_id, function(topic){
	
					$scope.topic = topic;
				
		
				})
			
			$scope.newPost = {};
		})

			

	}




				


	// ADD COMMENT UNDER THE POST

		var newComment = $scope.newComment;
	

		$scope.addComment = function(newComment, topic){

			var topic_id = topic._id;

			TopicFactory.addComment(newComment, function(){
				

				TopicFactory.getTopicById(topic_id, function(topic){
	
					$scope.topic = topic;
				
		
				})		

				
			$scope.newComment = {};
		})

	}

	// ADD LIKE TO POST 

		$scope.addLike = function(post){

				var postLike = post;	

				TopicFactory.addLike(postLike, function(){
					
					postLike = "";
				})

		}


	// ADD DISLIKE TO POST	
		$scope.addDislike = function(post){

				var postDislike = post;	

				TopicFactory.addDislike(postDislike, function(){
					
					postDislike = "";
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


  
