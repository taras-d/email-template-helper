var gulp = require('gulp'),
    runSequence = require('run-sequence'),
    fileInclude = require('gulp-file-include'),
    inlineCss = require('gulp-inline-css'),
    less = require('gulp-less'),
    plumber = require('gulp-plumber');

var lessOptions = {};

var fileIncludeOptions = {
    basepath: 'src',
    indent: true
};

var inlineCssOptions = {
    removeHtmlSelectors: true
};

gulp.task('email:less', function() {
    return gulp.src('src/styles/styles.less')
        .pipe(plumber())
        .pipe(less(lessOptions))
        .pipe(gulp.dest('src'));
});

gulp.task('email:template', function() {
    return gulp.src('src/templates/**/*.html')
        .pipe(plumber())
        .pipe(fileInclude(fileIncludeOptions))
        .pipe(inlineCss(inlineCssOptions))
        .pipe(gulp.dest('dist'));
});

gulp.task('email', function(cb) {
    runSequence(
        'email:less',
        'email:template',
        cb
    );
});

gulp.task('watch', ['email'], function() {
    gulp.watch([
        'src/styles/**/*.less',
        'src/components/**/*.less',
        'src/components/**/*.html',
        'src/templates/**/*.html'
    ], ['email']);
});
