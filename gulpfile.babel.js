import gulp from "gulp";
import gutil from "gulp-util";
import { Server } from "karma";


/**
 * Run tests using karma.
 */
gulp.task('test', done => {
    new Server({
        configFile: __dirname + '/karma.conf.js',
        singleRun: false
    }, done).start();
});
