'use strict';

var gulp = require('gulp');

gulp.paths = {
  src: 'src',
  dist: 'dist',
  tmp: '.tmp',
  e2e: 'e2e'
};

require('require-dir')('./gulp');

gulp.task('build', ['clean'], function () {
    gulp.start('buildapp');
});

gulp.task('serveprod', function() {
    connect.server({
        root: ['src'],
        port: process.env.PORT || 5000, // localhost:5000
        livereload: false
    });
});

gulp.task('default', ['compile']);