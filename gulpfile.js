/**
 * Gulp tasks
 * @file gulpfile
 */

var autoprefixer = require('gulp-autoprefixer'),
    connect = require('gulp-connect'),
    gulp = require('gulp'),
    htmlReplace = require('gulp-html-replace'),
    jspm = require('gulp-jspm'),
    mergeMediaQueries = require('gulp-merge-media-queries'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass');

global.paths = {
    server: '',
    source: 'src',
    destination: 'dist',
    css: '/**/*.{css,scss}',
    js: '/**/*.{js,tpl}',
    html: '/**/*.html',
    rootSCSS: '/components/all.scss'
};

gulp.task('connect', function () {
    'use strict';
    return connect.server({
        root: global.paths.server,
        livereload: true,
        port: 8181
    });
});

gulp.task('css', function () {
    'use strict';
    return gulp.src(global.paths.source + global.paths.rootSCSS)
        .pipe(sass().on('error', sass.logError))
        .pipe(mergeMediaQueries({log: true}))
        .pipe(autoprefixer({browsers: ['last 2 versions']}))
        .pipe(rename('all.css'))
        .pipe(gulp.dest(global.paths.source + '/components'))
        .pipe(connect.reload())
        .on('error', function (error) {
            console.error('css error: ' + error);
        });
});

gulp.task('html', function () {
    'use strict';
    return gulp.src(global.paths.source + global.paths.html)
        // .pipe(gulp.dest(global.paths.destination))
        .pipe(connect.reload())
        .on('error', function (error) {
            console.error('html error: ' + error);
        });
});

gulp.task('js', function () {
    'use strict';
    return gulp.src([global.paths.source + global.paths.js])
        // .pipe(gulp.dest(global.paths.destination))
        .pipe(connect.reload())
        .on('error', function (error) {
            console.error('js error: ' + error);
        });
});

gulp.task('build', ['css', 'html', 'js']);
gulp.task('default', ['connect', 'build', 'watch']);
gulp.task('watch', function () {
    'use strict';
    gulp.watch([global.paths.source + global.paths.css], ['css']);
    gulp.watch([global.paths.source + global.paths.html], ['html']);
    gulp.watch([global.paths.source + global.paths.js], ['js']);
});