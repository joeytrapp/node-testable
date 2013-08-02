var testable = require('../lib/testable'),
    cheerio  = require('cheerio');

exports.testable_interface = {
  testAssetsPath: function(test) {
    var regexp = new RegExp('.+\/node-testable\/data\/vendor');
    test.ok(regexp.test(testable.assetsPath()));
    test.done();
  },

  testMarkupQunit: function(test) {
    var config, $;
    config = {
      files: ['test/data/app/*.js'],
      tests: ['test/data/spec/*_spec.js']
    };
    $ = cheerio.load(testable.markup(config));
    test.equal($('script[src="qunit.js"]').length, 1);
    test.equal($('link[href="qunit.css"]').length, 1);
    test.equal($('div#qunit').length, 1);
    test.equal($('div#qunit-fixture').length, 1);
    test.equal($('script[src="test/data/app/app.js"]').length, 1);
    test.equal($('script[src="test/data/app/lib.js"]').length, 1);
    test.equal($('script[src="test/data/spec/app_spec.js"]').length, 1);
    test.equal($('script[src="test/data/spec/lib_spec.js"]').length, 1);
    test.done();
  },

  testMarkupJasmine: function(test) {
    var config, $;
    config = {
      framework: 'jasmine',
      cwd: process.cwd() + '/test',
      files: ['data/app/*.js'],
      tests: ['data/spec/*_spec.js']
    };
    $ = cheerio.load(testable.markup(config));
    test.equal($('script[src="jasmine.js"]').length, 1);
    test.equal($('script[src="jasmine-html.js"]').length, 1);
    test.equal($('link[href="jasmine.css"]').length, 1);
    test.equal($('script[src="data/app/app.js"]').length, 1);
    test.equal($('script[src="data/app/lib.js"]').length, 1);
    test.equal($('script[src="data/spec/app_spec.js"]').length, 1);
    test.equal($('script[src="data/spec/lib_spec.js"]').length, 1);
    test.done();
  },
  
  testMarkupMochaDefaults: function(test) {
    var config, $;
    config = {
      framework: 'mocha',
      transformPath: 'test/data/',
      files: ['test/data/app/*.js'],
      tests: ['test/data/spec/*_spec.js']
    };
    $ = cheerio.load(testable.markup(config));
    test.equal($('script[src="mocha.js"]').length, 1);
    test.equal($('script[src="chai.js"]').length, 1);
    test.equal($('link[href="mocha.css"]').length, 1);
    test.equal($('div#mocha').length, 1);
    test.equal($('script:contains("bdd")').length, 1);
    test.equal($('script:contains("chai.expect")').length, 1);
    test.equal($('script[src="app/app.js"]').length, 1);
    test.equal($('script[src="app/lib.js"]').length, 1);
    test.equal($('script[src="spec/app_spec.js"]').length, 1);
    test.equal($('script[src="spec/lib_spec.js"]').length, 1);
    test.done();
  },

  testMarkupMochaExportsShould: function(test) {
    var config, $;
    config = {
      framework: 'mocha',
      chai: 'should',
      style: 'exports',
      transformPath: 'test/data/',
      files: ['test/data/app/*.js'],
      tests: ['test/data/spec/*_spec.js']
    };
    $ = cheerio.load(testable.markup(config));
    test.equal($('script[src="mocha.js"]').length, 1);
    test.equal($('script[src="chai.js"]').length, 1);
    test.equal($('link[href="mocha.css"]').length, 1);
    test.equal($('div#mocha').length, 1);
    test.equal($('script:contains("exports")').length, 1);
    test.equal($('script:contains("chai.should")').length, 1);
    test.equal($('script[src="app/app.js"]').length, 1);
    test.equal($('script[src="app/lib.js"]').length, 1);
    test.equal($('script[src="spec/app_spec.js"]').length, 1);
    test.equal($('script[src="spec/lib_spec.js"]').length, 1);
    test.done();
  },

  testMarkupMochaTddAssert: function(test) {
    var config, $;
    config = {
      framework: 'mocha',
      chai: 'assert',
      style: 'tdd',
      transformPath: 'test/data/',
      files: ['test/data/app/*.js'],
      tests: ['test/data/spec/*_spec.js']
    };
    $ = cheerio.load(testable.markup(config));
    test.equal($('script[src="mocha.js"]').length, 1);
    test.equal($('script[src="chai.js"]').length, 1);
    test.equal($('link[href="mocha.css"]').length, 1);
    test.equal($('div#mocha').length, 1);
    test.equal($('script:contains("tdd")').length, 1);
    test.equal($('script:contains("chai.assert")').length, 1);
    test.equal($('script[src="app/app.js"]').length, 1);
    test.equal($('script[src="app/lib.js"]').length, 1);
    test.equal($('script[src="spec/app_spec.js"]').length, 1);
    test.equal($('script[src="spec/lib_spec.js"]').length, 1);
    test.done();
  }
};

