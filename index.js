var fs = require('fs');
var path = require('path');
var through = require('through2');
var gutil = require('gulp-util');
var gulpFile = require('gulp-file');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var File = gutil.File;
var PluginError = gutil.PluginError;

var fn = function (fileType) {
    if (fileType === 'js') {
        return uglify();
    }
    if (fileType === 'css') {
        return minifyCss();
    }
    return true;
};

var lazyMinify = function() {
    var stream = through.obj(function (file, enc, callback) {
        var subs = file.path.toLowerCase().split('.');
        var isMinified = subs.length > 2 && subs[subs.length - 2] === 'min';

        if (isMinified) {
            //console.log('source-minified: ' + file.path);
            callback(null, file);
        }
        else {
            var fileType = subs[subs.length - 1];
            var minPath = subs[0];
            for (var i = 0; i < subs.length - 2; i++) {
                minPath += '.' + subs[i];
            }
            minPath += '.min.' + fileType;

            var basename = path.basename(file.path);
            var filename = basename.substring(0, basename.lastIndexOf('.')) + '.min.' + fileType;

            fs.readFile(minPath, function (err, data) {
                if (err == null) {
                    //console.log('pre-minified: ' + minPath);

                    var minFile = new File({
                        path: filename,
                        contents: data
                    });

                    callback(null, minFile);
                } else {
                    //console.log('to-minify: ' + file.path);

                    gulpFile(filename, file.contents, { src: true })
                        .pipe(fn(fileType))
                        .pipe(through.obj(function (minFile, enc, cb) {
                            cb();
                            callback(null, minFile);
                        }));
                }
            });
        }
    });

    return stream;
};

module.exports = lazyMinify;