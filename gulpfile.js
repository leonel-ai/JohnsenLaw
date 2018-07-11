var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var cssnano = require('gulp-cssnano');
var gulpIf = require('gulp-if');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var del = require('del');

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'app' // root of server starts from app folder
    }
  });
});

gulp.task('sass', function(done) {
  gulp.src('app/scss/**/*.scss')
    .pipe(sass()) // converts Sass to CSS with gulp-sass
    .on('error', sass.logError)
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({
      stream: true
    })),
    done();
});

gulp.task('watch', gulp.parallel(['browserSync', 'sass'], function() {
  gulp.watch('app/scss/**/*.scss', gulp.series('sass')), // watch all sass files for changes
  gulp.watch('app/*.html', browserSync.reload),
  gulp.watch('app/js/**/*.js', browserSync.reload);
}));

// note <anon> CL msgs are a-ok albeit annoying

// concatenate files and minify files
gulp.task('useref', function() {
  return gulp.src('app/*.html')
    .pipe(useref())
    // mini only if JS file
    .pipe(gulpIf('*.js', uglify()))
    // mini only if CSS file
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'))
});

// optimize images
gulp.task('images', function() {
  return gulp.src('app/images/**/*.+(png|jpg|jpeg|gif|svg)')
    // caching images that run through imagemin
    .pipe(cache(imagemin({
      // setting interlaced (gifs)
      interlaced: true
    })))
    .pipe(gulp.dest('dist/images'))
});

// copy fonts over
gulp.task('fonts', function() {
  return gulp.src('app/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'))
});

// cleaning
gulp.task('clean:dist', function(done) {
  del.sync('dist');
  done();
});

// to wrap it all up for production
var build = gulp.series('clean:dist', gulp.parallel('sass', 'useref', 'images', 'fonts'));

gulp.task('default', build, function(done){
  done();
});
