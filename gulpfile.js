const gulp = require('gulp');
const plumber = require('gulp-plumber');
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const minifyCss = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');


const config = {
    styles: {
        partials: './src/scss/partials/*.scss',
        src: './src/scss/*.scss',
        build: './public/assets/css/'
    },
    scripts: {
        src: './src/js/*.js',
        build: './public/assets/js/'
    },
    fonts: {
        build: './public/assets/fonts/'
    },
    images: {
        src: './src/img/**/*',
        build: './public/assets/img/'
    }
};

//Run styles and srripts tasks on changes in src directories
gulp.task('watch', function(){
    gulp.watch([
        config.styles.src,
        config.scripts.src
    ], [
        'styles',
        'scripts'
    ]);
});

//Compile scss to css, concat and minify styles
gulp.task('styles', function (){
    gulp.src([
        './node_modules/bootstrap/dist/css/bootstrap.min.css',
        './node_modules/font-awesome/css/font-awesome.min.css',
        config.styles.src
    ])
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(concat('main.min.css'))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(minifyCss({
            compatibility: 'ie9'
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(config.styles.build));
});

//Move fonts into public dir
gulp.task('fonts', function (){
    gulp.src([
        './node_modules/font-awesome/fonts/*'
    ])
        .pipe(gulp.dest(config.fonts.build));
});

//Concat and minify js
gulp.task('scripts', function (){
    gulp.src([
        './node_modules/jquery/dist/jquery.min.js',
        './node_modules/bootstrap/dist/js/bootstrap.bundle.min.js',
        config.scripts.src
    ])
        .pipe(plumber())
        .pipe(concat('app.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(config.scripts.build));
});

//Optimize images
gulp.task('images', function() {
    gulp.src([
        config.images.src
    ])
        .pipe(plumber())
        .pipe(imagemin())
        .pipe(gulp.dest(config.images.build));
});

gulp.task('default', ['styles', 'scripts', 'fonts', 'images']);
