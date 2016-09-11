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

// Added for HEROKU

gulp.task('serveprod', function() {
    connect.server({
        root: ['src'],
        port: process.env.PORT || 5000, // localhost:5000
        livereload: false
    });
});

var less = require('gulp-less');

gulp.task('compile', function () {
    return gulp.src('./less/*.less')
        .pipe(less())
        .pipe(gulp.dest('./css'));
});

gulp.task('default', ['compile']);