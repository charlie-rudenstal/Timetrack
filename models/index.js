/**
 * Will automatically require all other models in this folder
 * 
 * Usage:  
 *	 var models = require('./models')
 *   models.Member.save()
 */

require('fs').readdirSync('./models').forEach(function(file) {	
	// Ignore this file
	if(file == 'index.js') return;
	
	// Remove '.js' for names
	var modelName = file.slice(0, -3); 

	// Export model
	exports[modelName] = require('./' + file);
});