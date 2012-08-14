var 
	path = require('path'),
	expressValidator = require('express-validator'),
	_ = require('underscore'),
	express = require('express');

module.exports = function(options) {
	var me = {
		
		//Port that server listens to
		port : options.port,

		//Contains the express-app
		app : null,
		
		init : function() {
			//Since configure looses context when we call app.configure,
			//we need to bind the context
			_.bindAll(this, "configure");

			//Creates the app-object
			this.createApp();

			//Set the app to use the configure-method
			this.app.configure(this.configure);
		},

		route : function() {
			this.app.get('/', function(req, res) {
				res.render('index', { title: 'Express' });
			});
		},

		/*
			Returns an object that will be available in all views
		*/
		dynamicHelpers : function() {
			return {
				//Makes the request-object available in all views
				request : function(req, res) {
					return req;
				}
			}
		},

		/*
			Creates the app-object
		*/
		createApp : function() {
			this.app = express.createServer();
		},

		/*
			Configures the app-object
		*/
		configure : function() {
			//Configure view-engine
			this.app.set('views', __dirname + '/../views');
			this.app.set('view engine', 'jade');
			
			this.app.use(express.favicon());
			this.app.use(express.logger('dev'));
			this.app.use(express.methodOverride());
			this.app.use(require('stylus').middleware(__dirname + '/../public'));
			this.app.use(express.static(path.join(__dirname, '/../public')));
			this.app.use(express.cookieParser());
			this.app.use(expressValidator);
			this.app.use(express.session({ secret: '98dsnad97a8sdbasd978ahsd'}));
			this.app.use(express.bodyParser({
				//Required for file-uploads to work
				keepExtensions : true,
				uploadDir : __dirname + "/../public/uploads"
			}));

			this.app.dynamicHelpers(this.dynamicHelpers)
		},

		/*
			Starts the server
		*/
		start : function() {
			//Start listening
			this.app.listen(this.port);

			//Create routing
			this.route();
		}
	};
	
	//Automatically call init() on creation
	me.init();

	return me;
};