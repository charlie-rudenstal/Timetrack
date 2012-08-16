module.exports = {
	get_index : function(req, res) {
		res.render('about/index');
	},

	get_company : function(req, res) {
		res.render('about/company');
	}
};