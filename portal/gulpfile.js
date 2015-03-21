var gulp = require('gulp');
var gulpBower = require('gulp-bower');
var sass = require('gulp-sass');

gulp.task('sass', function () {
  return gulp.src('./src/site/style/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./build/site/style'));
});

gulp.task('bowerInstall', function() {
  return gulpBower({ cwd: './src/site/', directory: './bower_components', cmd: 'install' });
});

gulp.task('bowerLibs', ['bowerInstall'], function() {
  var lib = require('bower-files')({
    json: './src/site/bower.json',
    dir: './src/site/bower_components',
    overrides: {
      react: {
        main: ['react.js', 'JSXTransformer.js'],
        dependencies: {}
      }
    }
  });
  gulp.src(lib.ext('css').files)
    .pipe(gulp.dest('./build/site/style/'));

  return gulp.src(lib.ext('js').files)
    .pipe(gulp.dest('./build/site/lib/'));
});

gulp.task('buildStatic', function() {
  return gulp.src(['./src/site/static/*.*'])
    .pipe(gulp.dest('./build/site/static'));
});

gulp.task('buildJavascript', function() {
  return gulp.src(['./src/site/*.js'])
    .pipe(gulp.dest('./build/site'));
});


gulp.task('distLibs', ['bowerLibs'], function() {
  return gulp.src('./build/site/lib/*.js')
    .pipe(gulp.dest('./dist/public/lib'));
});

gulp.task('distSources', ['buildStatic', 'buildJavascript'], function() {
  return gulp.src(['./src/site/*.js', './src/site/static/**/*.*'])
    .pipe(gulp.dest('./dist/public'));
});

gulp.task('distStyles', ['sass', 'bowerLibs'], function() {
  return gulp.src(['./build/site/style/*.css'])
    .pipe(gulp.dest('./dist/public/style'));
});

gulp.task('build', ['distLibs', 'distSources', 'distStyles']);

gulp.task('watch', function() {
  gulp.watch(['./src/site/**/*.html','./src/site/**/*.js'], ['distSources']);
  gulp.watch('./src/site/style/*.scss', ['distStyles']);

});
