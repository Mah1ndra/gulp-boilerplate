var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');

var config = {
    sassPath: './scss/**/*.scss'
};

gulp.task('sass', function(){
    gulp.src(config.sassPath)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./css'));
});

gulp.task('watch', function(){
    gulp.watch(config.sassPath, ['sass']);
});

gulp.task('scripts', function(){
    gulp.src([
        './node_modules/jquery/dist/jquery-3.2.1.slim.min.js',
        './node_modules/popper.js/dist/popper.min.js',
        './node_modules/bootstrap/dist/js/bootstrap.min.js'
    ])
    .pipe(concat('app.js'))
    .pipe(gulp.dest('./js/'));
});

gulp.task('default', ['scripts', 'sass', 'watch']);
