import gulp from 'gulp';
import * as dartsass from 'sass';
import gulpSass from 'gulp-sass';
import browserSync from 'browser-sync';
import autoprefixer from 'gulp-autoprefixer';
import cleanCSS from 'gulp-clean-css';
import { deleteAsync } from 'del';

const sass = gulpSass(dartsass);
const bs = browserSync.create();

const paths = {
  styles: {
    src: 'src/scss/**/*.scss',
    dest: 'dist/css'
  },
  html: {
    src: 'src/*.html',
    dest: 'dist'
  }
};

export function clean() {
  return deleteAsync(['dist']);
}

export function styles() {
  return gulp.src(paths.styles.src, { sourcemaps: true })
    .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 10 versions'],
      cascade: false
    }))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(bs.stream());
}

export function html() {
  return gulp.src(paths.html.src)
    .pipe(gulp.dest(paths.html.dest))
    .pipe(bs.stream());
}

export function watch() {
  bs.init({
    server: {
      baseDir: './dist'
    }
  });
  gulp.watch(paths.styles.src, styles);
  gulp.watch(paths.html.src, html);
}

const dev = gulp.series(clean, gulp.parallel(styles, html), watch);

export default dev;