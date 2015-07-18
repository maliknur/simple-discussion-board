//MODELS - SERVER SIDE

var mongoose = require('mongoose'), 
Schema = mongoose.Schema;



var UserSchema = Schema({

	name: String,
	created_at: {type: Date, default: Date.now}

})

var CategorySchema = Schema({
	catname: String
})


var TopicSchema = Schema({

	topic: String,
	description: String,
	category: String,
	user_id: String,
	user_name: String,
	post: [{type: Schema.ObjectId, ref: 'Post'}],
	created_at: {type: Date, default: Date.now} 	

})

var PostSchema = Schema({

	_topic: {type: Schema.ObjectId, ref: 'Topic'},
	post: String,
	user_id: String,
	user_name: String,
	comment: [{type: Schema.Types.ObjectId, ref: 'Comment'}],
	created_at: {type: Date, default: Date.now},
	like: {type: Number, default: 0 },
	dislike: {type: Number, default: 0} 	

})

var CommentSchema = Schema({

	_post: {type: Schema.ObjectId, ref: 'Post'},
	comment: String,
	user_id: String,
	user_name: String,
	created_at: {type: Date, default: Date.now} 	

})



mongoose.model('User', UserSchema);

mongoose.model('Category', CategorySchema);

mongoose.model('Topic', TopicSchema);
mongoose.model('Post', PostSchema);
mongoose.model('Comment', CommentSchema);

