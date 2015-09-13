# gulp-lazy-minify
This plugin is used to minify JS/CSS only when it's needed.

There are currently 2 conditions where minifying/uglifying is not needed:

1. The source file is already minified
2. There exists a minified version of the source file in the same directory

Assumptions:

1. A JS file is a file with extension **.js**
2. A CSS file is a file with extension **.css**
3. A minified file is a file where it has **.min** before the extension

JS minification uses [gulp-uglify](https://www.npmjs.com/package/gulp-uglify/)

CSS minififcation uses [gulp-minify-css](https://www.npmjs.com/package/gulp-minify-css/)
