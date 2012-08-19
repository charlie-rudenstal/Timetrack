all: controllers models
	
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

.PHONY: all controllers models 