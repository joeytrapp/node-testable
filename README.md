# Testable

Library that generates the html for a browser test runner.

## Usage

	var testable = require('testable');
	
	// Get the final html string (default is qunit)
	testable.markup();
	
	// Get markup for jasmine test runner.
	testable.markup({ framework: 'jasmine' });
	
	// Get the absolute path to a the directory of bundled assets
	testable.assetsPath();
	
## Config

### config.framework

Set what built in test framework adapter to use.

Bundled adapters: `qunit` (default), `jasmine`, and `mocha`.

### config.files

Array of strings that are the files to be loaded in the test runner. These strings are passed through [node-glob](https://github.com/isaacs/node-glob). Files included here are filtered, and css files are included in the page `head`, and js files are included in order in the page `body`.

### config.transformPath

This options can be a string or a function. In the resulting html, the paths to the files in the `files` configuration will be relative to `process.cwd()`. Those paths may not be reachable by the browser depending on how the webserver is setup. `transformPath` can modify each path to something that is reachable.

When `transformPath` is a string, it is used as the search in a call to `String.replace()`. If the `files` option is set to `['tmp/build/js/**/*.js']` and `transformPath` is `tmp/build/`, then in the browser, the script tag src attributes will be `js/...`.

`transformPath` can also be a function which gets the src path as a param and returns the path that should be set in the browser.

### config.chai (mocha framework only)

When using the `mocha` framework, the `chai` configuration option is used to choose what type of assertion style to use with chai. See [chaijs.org](http://chaijs.com/) for more information. Valid options are `expect` (default), `assert`, and `should`.

### config.style (mocha framework only)

When using the `mocha` framework, the `style` configuration option is used to set the spec syntax for mocha. See [mocha interfaces](http://visionmedia.github.io/mocha/#interfaces) for more information. Valid options are `bdd` (default), `tdd`, `exports`, and `qunit`.

## Example

Here is a quick example app using [Express.js](http://expressjs.com/).

	var express = require('express'),
		testable = require('testable'),
		app = express(), testableConfig;
		
	testableConfig = {
		framework: 'qunit',
		files: ['public/js/app.js', 'test/**/*_test.js'],
		transformPath: 'test/'
	};
	
	// Make testable assets available
	app.use(express.static(testable.assetsPath()));
	
	app.use(express.static(__dirname + '/public'));
	app.use(express.static(__dirname + '/test'));
	
	app.get('/test.html', function(req, res) {
		res.setHeader('Content-Type', 'text/html');
		res.end(testable.markup(testableConfig));
	});
	
	app.listen(8000);
	
Also check out [testable-middleware](https://github.com/joeytrapp/node-testable-middleware) to use testable with Connect or Express.