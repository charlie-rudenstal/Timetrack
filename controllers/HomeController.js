var models = require('../models');

module.exports = {
	get_index : function(req, res) {
		
		var member = new models.Member();
		member.name = 'woop';
		member.save();

		models.Member.find({}, function(err, members) {
			res.render('index', { "members": members });
		});

	}
};