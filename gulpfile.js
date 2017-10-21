var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');

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

gulp.task('default', ['sass', 'watch']);
