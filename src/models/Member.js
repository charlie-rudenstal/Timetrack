var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
    Deferred = traceur.runtime.Deferred; 

var schema = new Schema({
	name	: String	
});

var model = mongoose.model('Member', schema);

// For 1 parameter when callback is 2 parameter
// function makeAsync(func) {
// 	return function(a) {
// 		var d = new Deferred();
// 		func(a, function(err, res) { d.callback(res); });
// 		return d.createPromise();
// 	}
//}

// Create async methods
model.asyncFind = function(q) { 
	var d = new Deferred();
	model.find(q, function(err, res) { d.callback(res); });
	return d.createPromise();
};

module.exports = model;