var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();


gulp.task('browserSync', function() {
    browserSync.init({
      server: {
        baseDir: 'app' // root of server starts from app folder
      }
  });
});

gulp.task('sass', function() {
    gulp.src('app/scss/**/*.scss')
      .pipe(sass()) // converts Sass to CSS with gulp-sass
      .on('error', sass.logError)
      .pipe(gulp.dest('app/css'))
      .pipe(browserSync.reload({
        stream: true
      }))
});

gulp.task('watch', gulp.parallel(['browserSync', 'sass'], function() {
    gulp.watch('app/scss/**/*.scss', gulp.series('sass')); // watch all sass files for changes
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/js/**/*.js', browserSync.reload);
}));

// note <anon> CL msgs are a-ok albeit annoying
