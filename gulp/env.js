/**
 * Created by joeny on 12/23/16.
 */
var gulp = require('gulp');
var ngConfig = require('gulp-ng-config');
var fs = require('fs');
var config = require('../config.js');


// If the app environment is not set, we default to development
var ENV = process.env.APP_ENV || 'development';

// Here, we use dotenvn  to load our env vars in the .env, into process.env
if (ENV === 'development') {
  require('dotenv').load();
}

/*
 *  We first generate the json file that gulp-ng-config uses as input.
 *  Then we source it into our gulp task.
 *  The env constants will be a saved as a sub-module of our app, ngEnVars.
 *  So we shall name it ngEnvVars.config.
 */
gulp.task('ng-config', function() {
  fs.writeFileSync(
    './tmp/config.json',
    JSON.stringify(
      config[ENV], null, 4)
  );

  gulp.src('./tmp/config.json')
    .pipe(
      ngConfig('app', {
        createModule: false,
        wrap: true
      })
    )
    .pipe(gulp.dest('./src/app/'))
});
