var models = require('../models');
var Deferred = traceur.runtime.Deferred;

module.exports = {
	get_index : function(req, res) {

		var member = new models.Member();
		member.name = Math.random() >= 0.5 ? 'Charlie' : 'Julian';
		member.save();

		var members;
		await members = models.Member.asyncFind({});
		res.render('index', {members});

	}
};