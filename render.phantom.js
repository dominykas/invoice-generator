var page = require('webpage').create(),
	loadInProgress = false,
	fs = require('fs');

page.paperSize = {format: 'A4', orientation: 'portrait', border: '2cm'};

var htmlFiles = [];
var outputFolder = fs.workingDirectory + fs.separator + 'output';
var dir = fs.list(outputFolder);

// loop through files and folders
for (var i = 0; i < dir.length; i++) {
	var fullPath = outputFolder + fs.separator + dir[i];
	// check if item is a file
	if (fs.isFile(fullPath)) {
		// check that file is html
		if (fullPath.indexOf('.html') != -1) {
			// show full path of file
			console.log('Found: ' + fullPath);
			htmlFiles.push(fullPath);
		}
	}
}

console.log('Number of HTML files: ' + htmlFiles.length);

// output pages as PNG
var pageIndex = 0;

setInterval(function () {
	if (!loadInProgress && pageIndex < htmlFiles.length) {
		page.open(htmlFiles[pageIndex]);
	}
	if (pageIndex == htmlFiles.length) {
		console.log("All done!");
		phantom.exit();
	}
}, 250);

page.onLoadStarted = function () {
	loadInProgress = true;
	console.log('Loading: ' + htmlFiles[pageIndex]);
};

page.onLoadFinished = function () {
	loadInProgress = false;
	console.log('Done loading: ' + htmlFiles[pageIndex]);

	var outFn = htmlFiles[pageIndex].replace('.html', '.pdf')
	page.render(outFn);
	console.log('Done rendering: ' + htmlFiles[pageIndex]);
	pageIndex++;
};
