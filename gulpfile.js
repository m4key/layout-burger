const { src, dest, task, series, watch, parallel } = require('gulp');
const rm = require('gulp-rm');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload
const sassGlob = require('gulp-sass-glob');
const autoprefixer = require('gulp-autoprefixer');
//const px2rem = require('gulp-smile-px2rem');
const gcmq = require('gulp-group-css-media-queries');
const cleanCSS = require('gulp-clean-css');
//const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify'); 
const gulpif = require('gulp-if');

const env = process.env.NODE_ENV;

sass.compiler = require('node-sass');

task('clean', () => {
  return src('dist/**/*', { read: false }).pipe(rm());
});

task('html', () => {
  return src('src/*.html').pipe(dest('dist')).pipe(reload({ stream: true }));
});


const styles = [
  'node_modules/normalize.css/normalize.css',
  'src/css/main.scss',
  'src/css/blocks/',
  'src/css/_misc/'
]
task('styles', () => {
  return src(styles)
    //.pipe(gulpif(env === 'dev', sourcemaps.init()))
    .pipe(concat('main.scss'))
    .pipe(sassGlob())
    .pipe(sass().on('error', sass.logError))
    //.pipe(px2rem())
    .pipe(
      gulpif(
        env === 'dev',
        autoprefixer({
          browsers: ['last 4 versions'],
          cascade: false
        }))
    )
    .pipe(gulpif(env === 'prod', gcmq()))
    .pipe(gulpif(env === 'prod', cleanCSS()))
    //.pipe(gulpif(env === 'dev', sourcemaps.write()))
    .pipe(dest('dist/css'))
    .pipe(reload({ stream: true }));
});

task('scripts', () => {
  return src('src/js/*.js')
    //.pipe(sourcemaps.init())
    .pipe(concat('app.min.js', { newLine: ';' }))
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(uglify())
    //.pipe(sourcemaps.write())
    .pipe(dest('dist/js'))
    .pipe(reload({ stream: true }));
});

task('fonts', () => {
  return src('src/fonts/*.*')
    .pipe(dest('dist/fonts'));
});

task('images', () => {
  return src('src/images/*')
    .pipe(dest('dist/images'));
});

task('videos', () => {
  return src('src/video/*.mp4')
    .pipe(dest('dist/video'));
});
task('icons', () => {
  return src('src/icons/*.svg')
    .pipe(dest('dist/icons'));
});

task('server', () => {
  browserSync.init({
    server: {
      baseDir: "./dist"
    },
    open: false
  });
});

task('watch', () => {
  watch('./src/*.html', series('html'));
  watch('./src/styles/**/*.scss', series('styles'));
  watch('./src/scripts/*.js', series('scripts'));
});

task(
  'default',
  series(
    'clean', 'images', 'icons', 'fonts' , 'videos',
    parallel('html', 'styles', 'scripts'),
    parallel('watch', 'server'))
);
task(
  'build',
  series(
    'clean', 'images', 'icons', 'fonts' , 'videos',
    parallel('html', 'styles', 'scripts'))
);