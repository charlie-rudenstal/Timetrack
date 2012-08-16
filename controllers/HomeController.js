var models = require('../models');

module.exports = {
	get_index : function(req, res) {
		
		var member = new models.Member();
		member.name = Math.random() >= 0.5 ? 'Charlie' : 'Julian';
		member.save();

		models.Member.find({}, function(err, members) {
			res.render('index', { "members": members });
		});

	}
};