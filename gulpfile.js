/* File: gulpfile.js */

// grab our gulp packages
var gulp  = require('gulp'),
    gutil = require('gulp-jshint'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync').create(),
    autoprefixer = require('gulp-autoprefixer');
    
// define the default task and add the watch task to it
gulp.task('default', ['watch']);

// configure the jshint task
gulp.task('jshint', function() {
  return gulp.src('source/js/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

// configure which files to watch and what tasks to use on file changes
gulp.task('watch', function() {
    
    browserSync.init({
        server: "./public/"
    });
    
    gulp.watch('source/js/**/*.js', ['jshint']);
    gulp.watch('source/scss/**/*.scss', ['sass']);    
    gulp.watch(['./public/*.html','./public/assets/css/*.css','./public/assets/js/*.js']).on('change', browserSync.reload);
});


// Static server - browser-sync
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./public"
        }
    });
});

// sass
gulp.task('sass', function() {
    gulp.src('source/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(gulp.dest('./public/assets/css/'));
});