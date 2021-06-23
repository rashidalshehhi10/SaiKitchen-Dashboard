var gulp = require('gulp');
var build = require('./build');
var yargs = require('yargs');
var deployCdn = require('gulp-deploy-azure-cdn');
var gutil = require('gulp-util');

// get demo from parameters
var demo = Object.keys(yargs.argv).join(' ').match(/(demo\d+)/ig) || 'demo1';
if (typeof demo === 'object') {
  demo = demo[0];
}

// localhost site
var connect = require('gulp-connect');
gulp.task('localhost', function(cb) {
  connect.server({
    root: '../' + demo + '/dist',
    livereload: true,
    // port: 8081,
  });
  cb();
});

gulp.task('upload-app-to-azure', function () {
    return gulp.src(['*.js','*.json','*.html','*.css'], {
        base: '../' + demo + '/dist' // optional, the base directory in which the file is located. The relative path of file to this directory is used as the destination path
    }).pipe(deployCdn({
        containerName: 'saikitchenfrontend', // container name in blob
        serviceOptions: ['saikitchenstorage', '3T0N76fi775rEzIVVWkx1mb89luBAjrbpr4znDtF0Ca/j6by/5ecteMWzodOeqH9C8MunRyC8iuVqhGJ40R9Gw=='], // custom arguments to azure.createBlobService
        folder: '/', // path within container
        zip: true, // gzip files if they become smaller after zipping, content-encoding header will change if file is zipped
        deleteExistingBlobs: true, // true means recursively deleting anything under folder
        concurrentUploadThreads: 10, // number of concurrent uploads, choose best for your network condition
        metadata: {
            cacheControl: 'public, max-age=31530000', // cache in browser
            cacheControlHeader: 'public, max-age=31530000' // cache in azure CDN. As this data does not change, we set it to 1 year
        },
        testRun: false // test run - means no blobs will be actually deleted or uploaded, see log messages for details
    })).on('error', gutil.log);
});

gulp.task('reload', function(cb) {
  connect.reload();
  cb();
});

gulp.task('watch', function() {
  return gulp.watch([build.config.path.src + '/**/*.js', build.config.path.src + '/**/*.scss'], gulp.series('build-bundle'));
});

gulp.task('watch:scss', function() {
  return gulp.watch(build.config.path.src + '/**/*.scss', gulp.parallel('build-bundle'));
});

gulp.task('watch:js', function() {
  return gulp.watch(build.config.path.src + '/**/*.js', gulp.parallel('build-bundle'));
});
