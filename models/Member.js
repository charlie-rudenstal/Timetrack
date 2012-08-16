var mongoose = require('mongoose'),
	Schema = mongoose.Schema

var schema = new Schema({
	name	: String	
});

module.exports = mongoose.model('Member', schema);