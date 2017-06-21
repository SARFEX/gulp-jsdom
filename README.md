# gulp-jsdom [![npm](https://img.shields.io/npm/v/gulp-jsdom.svg)](https://www.npmjs.com/package/gulp-jsdom) [![GitHub stars](https://img.shields.io/github/stars/sarfex/gulp-jsdom.svg?style=social&label=Star)](https://github.com/SARFEX/gulp-jsdom)


> Manipulate DOM with jsdom


## Installation

Install package with NPM and add it to dev dependencies:

`npm install gulp-jsdom --save-dev`

## Usage

```javascript
const gulp = require("gulp");
const dom = require("gulp-jsdom");

gulp.task("html", function () {
	return gulp.src("./index.html")
	
	.pipe(dom(function(document){
		var title = document.querySelector("title").textContent;
		console.log(title);
	}))
	.pipe(gulp.dest("./public/"));
});
  
});
```