const gulp   		= require('gulp');
const concat 		= require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');
const browserSync = require('browser-sync').create();

const jsFiles = [
	'./src/js/jquery-3.3.1.min.js',
	'./src/js/some.js'
]

gulp.task('serve', function() {
	browserSync.init({
		server: {
			baseDir: "./"
		}
	});
	browserSync.watch('build',browserSync.reload)
});

gulp.task('sass', function () {
  return gulp.src('./sass/main.sass')
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['> 0.1%'],
			cascade: false
		}))
		.pipe(gulp.dest('./build/css'))
		.pipe(browserSync.stream());;
});

gulp.task('scripts', function () {
	return gulp.src(jsFiles)
							.pipe(concat('main.js'))
							.pipe(uglify({
								toplevel: true
							}))
							.pipe(gulp.dest('./build/js'))
							.pipe(browserSync.stream());
});

gulp.task('watch', function() {
	gulp.watch("./*.html").on('change', browserSync.reload);
	gulp.watch('./sass/**/*.sass', gulp.series('sass'));
	gulp.watch('./src/js/**/*.js', gulp.series('scripts'));
});

gulp.task('default', gulp.series(
	gulp.parallel('sass','scripts'),
	gulp.parallel('watch','serve')
));

