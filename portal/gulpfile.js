var gulp = require('gulp');
var gulpBower = require('gulp-bower');
var sass = require('gulp-sass');
var eslint = require('gulp-eslint');
var browserify = require('browserify');
var fs = require('fs');
var uglify = require('gulp-uglify');
var babel = require('gulp-babel');
var karma = require('karma').server;

gulp.task('buildSources', ['bowerLibs', 'buildStatic', 'buildJavascript']);
gulp.task('buildVerifiedSources', ['lint', 'test']);
gulp.task('build', ['optimise', 'distStyles', 'distStatic', 'distLibs']);
gulp.task('default', ['release']);

gulp.task('distStatic', ['buildVerifiedSources'], function () {
  return gulp.src('./build/site/static/**/*.*')
    .pipe(gulp.dest('./dist/public'));
});

gulp.task('distLibs', ['buildVerifiedSources'], function () {
  return gulp.src('./build/site/lib/*.js')
    .pipe(gulp.dest('./dist/public/lib'));
});

gulp.task('transpile', ['buildVerifiedSources'], function () {
  return gulp.src(['./build/es6'])
  .pipe(babel())
  .pipe(gulp.dest('./build/site'))
});

gulp.task('distStyles', ['sass'], function () {
  return gulp.src(['./build/site/style/*.css'])
    .pipe(gulp.dest('./dist/public/style'));
});

gulp.task('sass', ['bowerLibs'], function () {
  return gulp.src('./src/site/style/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./build/site/style'));
});

gulp.task('buildStatic', function () {
  return gulp.src(['./src/site/static/*.*'])
    .pipe(gulp.dest('./build/site/static'));
});

gulp.task('buildJavascript', function () {
  return gulp.src(['./src/site/*.js', './src/site/*.jsx'])
    .pipe(gulp.dest('./build/site/'));
});

gulp.task('bundle', ['transpile'], function () {
  return browserify({
    entries: './build/site/main.js',
    debug: true,
    paths: ['./build/site']
   }).bundle()
     .pipe(fs.createWriteStream('./build/main.bundle.js'));
});

gulp.task('optimise', ['bundle'], function () {
  return gulp.src('./build/main.bundle.js')
    .pipe(uglify())
    .pipe(gulp.dest('./dist/public'));
});

gulp.task('bowerInstall', function () {
  return gulpBower({ cwd: './src/site/', directory: './bower_components', cmd: 'install' });
});

gulp.task('bowerLibs', ['bowerInstall'], function () {
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

gulp.task('lint', ['buildSources'], function () {
  return gulp.src(['./build/site/*.js', './build/site/*.jsx'])
    .pipe(eslint('./lintConfig.json'))
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
});

gulp.task('test', ['buildSources'], function (done) {
  karma.start({
    configFile: __dirname + '/build.karma.conf.js'
  }, done);
});

gulp.task('release', ['build'], function () {
  return gulp.src(['dist/**', 'Dockerfile', 'package.json'])
    .pipe(gulp.dest('release'));
});

gulp.task('watch', function () {
  gulp.watch(['./src/site/**/*.html','./src/site/**/*.js', './src/site/**/*.jsx'], ['optimise']);
  gulp.watch('./src/site/style/*.scss', ['distStyles']);
});
