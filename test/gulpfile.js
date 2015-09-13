var gulp = require('gulp');
var del = require('del');
var lazyMinify = require('../');

gulp.task('clean', function () {
	del('output/*');
});

gulp.task('default', ['clean'], function () {
    gulp.src(['sample/file1.js', 'sample/file2.js', 'sample/file3.min.js'])
		.pipe(lazyMinify())
		.pipe(gulp.dest('output'));
});