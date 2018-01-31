var gulp = require('gulp')
var pug = require('gulp-pug');

gulp.task('pug', () => {
  return gulp.src(['slides/*.pug', '!slides/_*.pug'])
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest(''));
});

gulp.task('watch', ['pug'], function () {
  gulp.watch(['slides/*.pug'], ['pug']);
});

gulp.task('default', ['watch']);
