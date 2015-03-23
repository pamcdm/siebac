var gulp = require('gulp');
var gulpBower = require('gulp-bower');
var sass = require('gulp-sass');
var eslint = require('gulp-eslint');
var react = require('gulp-react');
var browserify = require('browserify');
var transform = require('vinyl-transform');

gulp.task('buildSources', ['bowerLibs', 'buildStatic', 'buildReactCompile', 'buildJavascript']);
gulp.task('buildVerifiedSources', ['lint']);
gulp.task('build', ['bundle', 'distStyles']);
gulp.task('default', ['build']);

gulp.task('distLibs', ['buildVerifiedSources'], function () {
  return gulp.src('./build/site/lib/*.js')
    .pipe(gulp.dest('./dist/public/lib'));
});

gulp.task('distSources', ['buildVerifiedSources'], function () {
  return gulp.src(['./build/site/*.js', './build/site/static/**/*.*'])
    .pipe(gulp.dest('./dist/public'));
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

gulp.task('bundle', ['distLibs', 'distSources'], function () {
  var browserified = transform(function (filename) {
    return browserify({entries: filename, debug: true}).bundle();
  });

  return gulp.src('./build/site/main.js')
    .pipe(browserified)
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

gulp.task('buildReactCompile', function () {
  return gulp.src(['./src/site/*.jsx'])
    .pipe(react())
    .pipe(gulp.dest('./build/site'));
});

gulp.task('buildJavascript', function () {
  return gulp.src(['./src/site/*.js'])
    .pipe(gulp.dest('./build/site'));
});

gulp.task('lint', ['buildSources'], function () {
  return gulp.src(['./build/site/*.js'])
    .pipe(eslint({
      rules: {
        strict: false,
        'no-trailing-spaces': 1,
        quotes: [1, "single", "avoid-escape"]
      },
      globals: {
        React: true,
        document: true,
        module: true,
        require: true
      }
    }))
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
});

gulp.task('watch', function () {
  gulp.watch(['./src/site/**/*.html','./src/site/**/*.js', './src/site/**/*.jsx'], ['distSources']);
  gulp.watch('./src/site/style/*.scss', ['distStyles']);
});
