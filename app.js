var config    = require('config')
  , mongoose  = require('mongoose')
  , webserver = require('./http/webserver')
  ,	webport   = process.env.PORT || config.webserver.port || 8080;

mongoose.connect(config.database.host);

new webserver({
  	port : webport
  })
.start();

console.log('Running at port ' + webport);