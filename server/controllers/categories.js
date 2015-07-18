// CATEGORY CONTROLLER - SERVER SIDE

var mongoose = require('mongoose');

var Category = mongoose.model('Category');

module.exports = (function(){

	return {
		show: function(req, res){
			Category.find({}, function(err, results){
				if(err){ console.log(err); }
					else { res.json(results); }
			})
		}
	}
})();

