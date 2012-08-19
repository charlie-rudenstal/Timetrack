all: controllers models restart
	
controllers:
	# Compile controllers to a temp directory first
	# because we don't want the duplicated directory
	# structure imposed by the traceur compiler
	# And also avoid the traceur-runtime.js for browsers
	traceurc src/controllers tmp/controllers
	cp -r tmp/controllers/src/controllers bin/.
	cp -r tmp/controllers/node_modules bin/.
	rm -rf tmp

models:
	# Just copy to bin folder to get relative paths in require:s correct 
	cp -r src/models bin/models

restart:
	# Forever restart will trigger error if the process doesn't exist
	forever stop app.js
	forever start app.js

.PHONY: all controllers models restart