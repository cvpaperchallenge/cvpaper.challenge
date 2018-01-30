var gulp = require('gulp')
var pug = require('gulp-pug');

gulp.task('pug', () => {
  return gulp.src(['./pug/*.pug', '!./pug/_*.pug'])
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest('./'));
});

gulp.task('watch', ['pug'], function () {
  gulp.watch(['./pug/*.pug'], ['pug']);
});

gulp.task('default', ['watch']);