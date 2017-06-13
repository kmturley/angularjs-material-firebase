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
    minifyHtml = require('gulp-htmlmin'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass');

global.paths = {
    server: '',
    source: 'src',
    destination: 'dist',
    css: '/**/*.{css,scss}',
    js: '/**/*.{js,tpl}',
    html: '/**/*.html',
    rootJS: '/components/all.js',
    rootSCSS: '/components/all.scss',
};

gulp.task('connect', function() {
    'use strict';
    return connect.server({
        root: global.paths.server,
        livereload: true,
        port: 8181,
    });
});

gulp.task('compile.assets', function() {
    'use strict';
    return gulp.src([global.paths.source + '/assets/**/*'])
        .pipe(connect.reload())
        .on('error', function(error) {
            console.error('assets error: ' + error);
        });
});

gulp.task('compile.css', function() {
    'use strict';
    return gulp.src(global.paths.source + global.paths.rootSCSS)
        .pipe(sass().on('error', sass.logError))
        .pipe(mergeMediaQueries({log: true}))
        .pipe(autoprefixer({browsers: ['last 2 versions']}))
        .pipe(rename('all.css'))
        .pipe(gulp.dest(global.paths.source + '/components'))
        .pipe(connect.reload())
        .on('error', function(error) {
            console.error('compile.css error: ' + error);
        });
});

gulp.task('compile.html', function() {
    'use strict';
    return gulp.src(global.paths.source + global.paths.html)
        .pipe(connect.reload())
        .on('error', function(error) {
            console.error('compile.html error: ' + error);
        });
});

gulp.task('compile.js', function() {
    'use strict';
    return gulp.src([global.paths.source + global.paths.rootJS])
        .pipe(connect.reload())
        .on('error', function(error) {
            console.error('compile.js error: ' + error);
        });
});

/* build */

gulp.task('build.assets', function() {
    'use strict';
    return gulp.src([global.paths.source + '/assets/**/*'])
        .pipe(gulp.dest(global.paths.destination + '/assets'))
        .on('error', function(error) {
            console.error('assets error: ' + error);
        });
});

gulp.task('build.css', function() {
    'use strict';
    return gulp.src(global.paths.source + global.paths.rootSCSS)
        .pipe(sass({style: 'compressed'}).on('error', sass.logError))
        .pipe(mergeMediaQueries({log: true}))
        .pipe(autoprefixer({browsers: ['last 2 versions']}))
        .pipe(rename('all.bundle.css'))
        .pipe(gulp.dest(global.paths.destination + '/components'))
        .on('error', function(error) {
            console.error('build.css error: ' + error);
        });
});

gulp.task('build.html', function() {
    'use strict';
    return gulp.src(global.paths.source + global.paths.html)
        .pipe(htmlReplace({
            'css': {
                src: ['dist/components/all.bundle.css'], // custom tags use [['{%', 'web/components/all.min.css', '%}']]
                tpl: '<link rel="stylesheet" href="%s" />', // custom tags use '<link rel="stylesheet" href="%s static \'%s\' %s" />'
            },
            'js': {
                src: ['dist/components/all.bundle.js'], // custom tags use [['{%', 'web/components/all.min.js', '%}']]
                tpl: '<script src="%s"></script>', // custom tags use  '<script src="%s static \'%s\' %s"></script>'
            },
        }))
        .pipe(minifyHtml({
            collapseWhitespace: true,
            //ignoreCustomFragments: [ (/\{\%[^\%]*?\%\}(\s)?/g) ] // custom tags use
        }))
        .pipe(gulp.dest(global.paths.destination))
        .on('error', function(error) {
            console.error('build.html error: ' + error);
        });
});

gulp.task('build.js', function() {
    'use strict';
    return gulp.src([global.paths.source + global.paths.rootJS])
        .pipe(jspm({
            minify: true,
            selfExecutingBundle: true,
            skipSourceMaps: true,
        }))
        .pipe(gulp.dest(global.paths.destination + '/components'))
        .on('error', function(error) {
            console.error('build.js error: ' + error);
        });
});

gulp.task('build', ['build.assets', 'build.css', 'build.html', 'build.js']);
gulp.task('compile', ['compile.assets', 'compile.css', 'compile.html', 'compile.js']);
gulp.task('default', ['connect', 'compile', 'watch']);
gulp.task('watch', function() {
    'use strict';
    gulp.watch([global.paths.source + global.paths.css], ['compile.css']);
    gulp.watch([global.paths.source + global.paths.html], ['compile.html']);
    gulp.watch([global.paths.source + global.paths.js], ['compile.js']);
});
