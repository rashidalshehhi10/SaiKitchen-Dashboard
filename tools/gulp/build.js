var yargs = require('yargs');
var fs = require('fs');
var colors = require('colors');
var gulp = require('gulp');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var deployCdn = require('gulp-deploy-azure-cdn');
var gutil = require('gulp-util');

// merge with default parameters
var args = Object.assign({
    prod: false,
    rtl: '',
    exclude: '',
    theme: '',
    demo: '',
    path: '',
    angular: false,
    react: false,
    vue: false,
}, yargs.argv);

var confPath = './../gulp.config.json';

module.exports = {};
if (fs.existsSync(__dirname + '/' + confPath)) {
    var d = new Date();
    var t = d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
    console.log('[' + t.grey + ']' + ' ' + 'Using config ' + confPath.green);
    module.exports = require(confPath);
}

gulp.task('upload-app-to-azure', function () {
    return gulp.src(['*.js','*.json'], {
        base: 'node_modules/deploy-azure-cdn' // optional, the base directory in which the file is located. The relative path of file to this directory is used as the destination path
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
