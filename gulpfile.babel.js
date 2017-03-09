import gulp from "gulp";
import gutil from "gulp-util";
import browserify from "browserify";
import rename from 'gulp-rename';
import flatten from 'gulp-flatten';
import es from 'event-stream';
import source from "vinyl-source-stream";
import babelify from "babelify";
import vueify from "vueify";
import uglify from "gulp-uglify";
import watchify from "watchify";
import buffer from "vinyl-buffer";
import {argv} from 'yargs';
import { Server } from "karma";

console.log(argv.f);

const entry = (argv.f !==undefined) ? argv.f : "./src/reg/star-rating.js";
const dest = "dist"; // destination folder

gulp.task('default', function(done) {
    gulp.src(['./src/reg/**-rating.js'], function(err, files) {
        if (err) done(err);

        var tasks = files.map(function(entry) {
            return browserify({
                    entries: [entry]
                })
                .external('vue') // exclude vue from dist files, this will be shimmed globally
                .bundle()
                .pipe(source(entry))
                .pipe(flatten())
                .pipe(rename({
                    extname: '.min.js'
                }))
                .pipe(buffer())
                .pipe(uglify())
                .pipe(gulp.dest(dest));
        });
        es.merge(tasks).on('end', done);
    })
});


gulp.task('watch', () => {
    const b = browserify({
        entries: entry,
        plugin: [watchify],
        debug: true,
        cache: {},
        packageCache: {}
    });

    b.external('vue');
    b.on('update', bundle);

    bundle();

    function bundle() {
        b.bundle()
            .on('error', err => {
                gutil.log("Browserify Error", gutil.colors.red(err.message))
            })
            .pipe(source('star-rating.js'))
            .pipe(gulp.dest(dest));
    }
});

/**
 * Run tests using karma.
 */
gulp.task('test', done => {
    new Server({
        configFile: __dirname + '/karma.conf.js',
        singleRun: false
    }, done).start();
});
