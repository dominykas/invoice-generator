module.exports = function (grunt) {

	grunt.registerTask("render-pdf", "Render PDF from HTML", function () {
		var shell = require("shelljs");

		var result = shell.exec("phantomjs render.phantom.js");
		if (result.code != 0) {
			console.warn(result);
			grunt.fail.fatal("PhantomJS didn't quite finish expectedly...");
		}
	});

};
