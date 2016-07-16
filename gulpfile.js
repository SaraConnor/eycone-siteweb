'use strict';

const   gulp      = require('gulp'),
        sass      = require('gulp-sass'),
        scsslint  = require('gulp-scss-lint'),
        html5Lint = require('gulp-html5-lint'),
        bootlint  = require('gulp-bootlint'),
        browserSync  = require('browser-sync');
  

gulp.task('lint:sass', function() {
  return gulp
    .src('./src/assets/css/**/*.scss')
    .pipe(scsslint());
});

gulp.task('lint:html', function() {
 return gulp.src('./src/**/*.html')
        .pipe(html5Lint());
});

gulp.task('lint:twbs', function() {
  return gulp.src('./src/index.html')
    .pipe(bootlint());
});

gulp.task('lint', ['lint:sass', 'lint:html', 'lint:twbs']);


// define Gulp Task "sass"
gulp.task('sass', function () {
  return gulp
    .src('./src/assets/css/style.scss')
    
    .pipe(sass.sync().on('error', sass.logError))
    
    .pipe(gulp.dest('./build/css'));
});
 
gulp.task('copyhtml', function() {
    return gulp
      .src(['./src/index.html'])
      .pipe(gulp.dest('./build/'));
});

gulp.task("copyimg", function() {
  
  return gulp
    .src(["./src/img/**/*"])
    .pipe(gulp.dest('./build/img'))
});

gulp.task('build', ['copyhtml', 'copyimg', 'sass']);

gulp.task('sass:watch', function () {
  gulp.watch('./src/assets/css/**/*.scss', ['copyhtml', 'sass']);
}); 


gulp.task('watch:lint', function() {
  gulp.watch('./src/**/*', ['lint']);
});
/-------------------------------------------------------------/

gulp.task('watch:scss',['browserSync','sass'],function(){
  gulp.watch('./src/assets/css/**/*.scss',['sass']);
});
gulp.task('browserSync',function(){
  browserSync({
      server:{
          baseDir:'src'
      }
  })
});

//Modification de  la tâche SASS
gulp.task('sass',function(){
  return gulp.src('./src/assets/css/**/*.scss')
    .pipe(gulp.dest('./src/assets/css'))
    .pipe(browserSync.reload({
    stream:true
    }))
});
