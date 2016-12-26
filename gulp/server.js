'use strict';

var gulp = require('gulp');

var paths = gulp.paths;

var util = require('util');

var browserSync = require('browser-sync');

var middleware = require('./proxy');

function browserSyncInit(baseDir, files, browser) {
  /*
  * baseDir:
  * files:
  * browser: Set the target browser, if not specified utilize default browser
  * */
  browser = browser === undefined ? 'default' : browser;

  var routes = null;
  if(baseDir === paths.src || (util.isArray(baseDir) && baseDir.indexOf(paths.src) !== -1)) {
    routes = {
      '/bower_components': 'bower_components'
    };
  }

  /*
  * browserSync.init(config, cb)
  * Start the Browsersync service.  This will launch a server, proxy or start the
  * snippet mode depending on your use-case.
  *
  * config (Optional):
  *   This is the main configuration for your Browersync instance and can contain any of the
  *   available options.
  *
  * cb (Optional)
  *   If you pass a callback function, it will be called when Browsersync has completed
  *   all setup taks and is ready to use.
  * */
  browserSync.instance = browserSync.init(files, {
    startPath: '/',
    server: {
      baseDir: baseDir,
      middleware: middleware,
      routes: routes
    },
    ui: {
      port: 3030
    },
    port: 3000,

    browser: browser
  });
}

gulp.task('serve', ['ng-config', 'watch'], function () {
  browserSyncInit([
    paths.tmp + '/serve',
    paths.src
  ], [
    paths.tmp + '/serve/app/**/*.css',
    paths.src + '/app/**/*.js',
    paths.src + 'src/assets/images/**/*',
    paths.tmp + '/serve/*.html',
    paths.tmp + '/serve/app/**/*.html',
    paths.src + '/app/**/*.html'
  ]);
});

gulp.task('serve:dist', ['buildapp'], function () {
  browserSyncInit(paths.dist);
});

gulp.task('serve:e2e', ['inject'], function () {
  browserSyncInit([paths.tmp + '/serve', paths.src], null, []);
});

gulp.task('serve:e2e-dist', ['buildapp'], function () {
  browserSyncInit(paths.dist, null, []);
});
