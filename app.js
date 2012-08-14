var 
	config = require('config'),
	webserver = require('./http/webserver');

new webserver({
  	port : process.env.PORT || config.webserver.port || 8080
  })
  .start();