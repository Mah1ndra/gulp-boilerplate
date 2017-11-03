var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');

var config = {
    sassPath: './src/scss/**/*.scss'
};

gulp.task('watch', function(){
    gulp.watch(config.sassPath, ['sass']);
});

gulp.task('sass', function(){
    gulp.src([
        './node_modules/bootstrap/dist/css/bootstrap.min.css',
        config.sassPath
    ])
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(concat('main.css'))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('scripts', function(){
    gulp.src([
        './node_modules/jquery/dist/jquery.slim.min.js',
        './node_modules/bootstrap/dist/js/bootstrap.min.js',
        './src/js/app.js'
    ])
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js/'));
});

gulp.task('default', ['scripts', 'sass']);
