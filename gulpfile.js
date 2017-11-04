var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var plumber = require('gulp-plumber');
var autoprefixer = require('gulp-autoprefixer');

var config = {
    sassPath: './src/scss/**/*.scss'
};

gulp.task('watch', function(){
    gulp.watch(config.sassPath, ['sass']);
});

gulp.task('sass', function(){
    gulp.src([
        './node_modules/bootstrap/dist/css/bootstrap.min.css',
        './node_modules/font-awesome/css/font-awesome.min.css',
        config.sassPath
    ])
        .pipe(plumber(function(error) {
            console.log(error.toString());
            this.emit('end');
        }))
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(concat('main.min.css'))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('fonts', function(){
    gulp.src([
        './node_modules/bootstrap/dist/fonts/*',
        './node_modules/font-awesome/fonts/*'
    ])
    .pipe(gulp.dest('./dist/fonts'));
});

gulp.task('scripts', function(){
    gulp.src([
        './node_modules/jquery/dist/jquery.slim.min.js',
        './node_modules/bootstrap/dist/js/bootstrap.min.js',
        './src/js/app.js'
    ])
        .pipe(plumber(function(error) {
            console.log(error.toString());
            this.emit('end');
        }))
        .pipe(concat('app.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js/'));
});

gulp.task('default', ['scripts', 'sass', 'fonts']);
