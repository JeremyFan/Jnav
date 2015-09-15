var gulp = require('gulp');

var uglify = require('gulp-uglify');
var cssminify = require('gulp-minify-css');
var htmlminify = require('gulp-htmlmin');

gulp.task('jsminify', function() {
	gulp.src('./src/scripts/*.js')
		.pipe(uglify())
		.pipe(gulp.dest('./dist/scripts'));
});

gulp.task('cssminify', function() {
	gulp.src('./src/styles/*.css')
		.pipe(cssminify())
		.pipe(gulp.dest('./dist/styles'));
});

/*
gulp.task('htmlminify', function() {
	gulp.src('./src/*.html')
		.pipe(htmlminify({
			removeComments: true,
			collapseWhitespace: true
		}))
		.pipe(gulp.dest('./dist'));
});
*/

gulp.task('default', function() {
	gulp.run('jsminify', 'cssminify');
});