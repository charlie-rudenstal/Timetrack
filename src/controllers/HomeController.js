var models = require('../models');
var Deferred = traceur.runtime.Deferred;

function asyncFind() {
	var d = new Deferred();
	models.Member.find({}, function(err, members) { d.callback(members); });
	return d.createPromise();
}

module.exports = {
	get_index : function(req, res) {

		var member = new models.Member();
		member.name = Math.random() >= 0.5 ? 'Charlie' : 'Julian';
		member.save();

		var members;
		await members = asyncFind();
		res.render('index', {members});

		// models.Member.find({}, function(err, members) {
		// 	res.render('index', { "members": members });
		// });

	}
};