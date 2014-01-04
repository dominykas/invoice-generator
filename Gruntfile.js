module.exports = function (grunt)
{

	grunt.loadTasks("tasks");
	grunt.registerTask("default", "Generate invoices", ["generate-html", "render-pdf"]);

};