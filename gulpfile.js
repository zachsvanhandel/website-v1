'use strict';

const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const cleanCss = require('gulp-clean-css');
const del = require('del');
const githubPages = require('gh-pages');
const gulp = require('gulp');
const htmlreplace = require('gulp-html-replace');
const merge = require('merge-stream');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');

function clean() {
    return del([
        'dist/',
        'src/css/',
        'src/fonts/',
        'src/js/vendor/',
        'src/scss/bootstrap/'
    ]);
};

function vendorFonts() {
    var fontawesomeCss = gulp.src([
        'node_modules/@fortawesome/fontawesome-free/css/**/*'
    ])
        .pipe(gulp.dest('src/fonts/fontawesome-free/css/'));

    var fontawesomeWebfonts = gulp.src([
        'node_modules/@fortawesome/fontawesome-free/webfonts/**/*'
    ])
        .pipe(gulp.dest('src/fonts/fontawesome-free/webfonts/'));

    return merge(
        fontawesomeCss, fontawesomeWebfonts
    );
}

function vendorJs() {
    var bootstrap = gulp.src([
        'node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
    ])
        .pipe(gulp.dest('src/js/vendor/'));

    var clipboard = gulp.src([
        'node_modules/clipboard/dist/clipboard.min.js'
    ])
        .pipe(gulp.dest('src/js/vendor/'));

    var jquery = gulp.src([
        'node_modules/jquery/dist/jquery.min.js'
    ])
        .pipe(gulp.dest('src/js/vendor/'));

    var popper = gulp.src([
        'node_modules/popper.js/dist/umd/popper.min.js'
    ])
        .pipe(gulp.dest('src/js/vendor/'));

    var typeit = gulp.src([
        'node_modules/typeit/dist/typeit.min.js'
    ])
        .pipe(gulp.dest('src/js/vendor/'));

    return merge(
        bootstrap, clipboard, jquery, popper, typeit
    );
}

function vendorScss() {
    var bootstrap = gulp.src([
        'node_modules/bootstrap/scss/**/*'
    ])
        .pipe(gulp.dest('src/scss/bootstrap/'));

    return merge(
        bootstrap
    );
}

function scss() {
    return gulp.src([
        'src/scss/**/*.scss',
        '!src/scss/bootstrap/**/*.scss'
    ])
        .pipe(sass.sync({
            outputStyle: 'expanded'
        }).on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(gulp.dest('src/css/'));
}

function css() {
    return gulp.src([
        'src/css/**/*.css'
    ])
        .pipe(cleanCss())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('dist/css/'))
        .pipe(browserSync.stream());
}

function js() {
    return gulp.src([
        'src/js/**/*.js',
        '!src/js/vendor/**/*.js'
    ])
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('dist/js/'))
        .pipe(browserSync.stream());
}

function html() {
    return gulp.src([
        'src/*.html'
    ])
        .pipe(htmlreplace({
            'js': 'js/main.min.js',
            'css': 'css/main.min.css',
            'theme': 'css/theme.min.css'
        }))
        .pipe(gulp.dest('dist/'));
}

function copyToDist() {
    return gulp.src([
        'src/CNAME',
        'src/favicon.ico',
        'src/img/**',
        'src/fonts/**',
        'src/js/vendor/**',
        'src/static/**'
    ], { base: 'src/' })
        .pipe(gulp.dest('dist/'));
};

function serve(done) {
    browserSync.init({
        server: {
            baseDir: 'src/'
        }
    });

    done();
}

function reload(done) {
    browserSync.reload();
    done();
}

function watch() {
    gulp.watch(['src/scss/**/*.scss'], gulp.series(scss, css, reload));
    gulp.watch(['src/js/**/*.js', '!src/js/**/*.min.js'], gulp.series(js, reload));
    gulp.watch(['src/*.html'], gulp.series(html, reload));
}

function publish(done) {
    githubPages.publish('dist/', {
        branch: 'master',
        message: 'Auto-generated commit',
        repo: 'https://github.com/zachsvanhandel/zachsvanhandel.github.io.git'
    }, done);
}

const vendor = gulp.series(clean, gulp.parallel(vendorFonts, vendorJs, vendorScss));
const build = gulp.series(vendor, scss, gulp.parallel(css, js), html, copyToDist);
const dev = gulp.series(build, gulp.parallel(serve, watch));
const deploy = gulp.series(build, publish);

exports.clean = clean;
exports.vendor = vendor;
exports.build = build;
exports.dev = dev;
exports.deploy = deploy;

exports.default = build;
