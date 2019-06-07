const { src, dest, task, series, watch } = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cssmin = require('gulp-cssmin');
const concat = require('gulp-concat');
const minify = require('gulp-minify');
const rename = require('gulp-rename');
const fs = require('fs');
const browserSync = require('browser-sync').create();

const srcPath = './src';
const distPath = './dist';



function cssCompile() {
    return src(`${srcPath}/*.scss`)
        .pipe(sass({ outputStyle: 'nested' }).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 10 versions'],
            cascade: false
        }))
        .pipe(dest(`${distPath}/css/`));
}


function cssMinify() {
    return src([`${distPath}/css/*.css`, `!${distPath}/css/*.min.css`])
        .pipe(cssmin())
        .pipe(rename({ suffix: '.min' }))
        .pipe(dest(`${distPath}/css`));
}

function jsMinify() {
    return src([`${srcPath}/*.js`])
        .pipe(minify({
            ext: {
                src: '.js',
                min: '.min.js'
            },
            noSource: false,
        }))
        .pipe(dest(`${distPath}/js/`));
}

task('css-compile', cssCompile);
task('css-minify', cssMinify);
task('js-minify', jsMinify);
const build = series('css-compile', 'css-minify', 'js-minify');
task('build', series('css-compile', 'css-minify', 'js-minify'));

function liveServer() {
    browserSync.init({
        server: {
            baseDir: distPath,
            directory: true,
        },
        notify: false
    });
    watch([`${srcPath}/*.js`], series('js-minify'));
    watch([`${srcPath}/*.scss`], series('css-compile', 'css-minify'));
    watch("**/*", { cwd: distPath }, browserSync.reload);
}

task('live', liveServer);
task('go',series('build','live'));