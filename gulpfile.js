var gulp = require('gulp')
var $ = require('gulp-load-plugins')() // 簡化 gulp 的 require
// var jade = require('gulp-jade')
// var sass = require('gulp-sass')
// var plumber = require('gulp-plumber')
// var postcss = require('gulp-postcss') // gulp-postcss 可以載入大量的插件協助 css 預處理 prefixer 或是後處理
// const sourcemaps = require('gulp-sourcemaps')
// const babel = require('gulp-babel')
// const concat = require('gulp-concat')
// var uglify = require('gulp-uglify')
// var watch = require('gulp-watch')
// var gulp_watch_jade = require('gulp-watch-jade')
var minimist = require('minimist') // 用來讀取指令轉成變數
var mainBowerFiles = require('main-bower-files')
var autoprefixer = require('autoprefixer')
var browserSync = require('browser-sync').create()
var gulpSequence = require('gulp-sequence') // 不使用 gulp-load-plugins

// production || development
var envOptions = {
  string: 'env',
  default: {env: 'development'}
}

const options = minimist(process.argv.slice(2), envOptions)
console.log(options)

gulp.task('jade', () => {
  return gulp.src('./source/**/*.jade')
    .pipe($.plumber())
    .pipe($.data(function (file) {
      var menus = require('./source/data/menu.json') // 讀取 menus 的 json data
      var sourceData = {
        'menus': menus
      }
      return sourceData
    }))
    // .pipe($.watch('./source/**/*.jade'))
    // .pipe($.watchJade('./public/**/*.jade', { delay: 1000 }))
    .pipe($.jade({pretty: true}))
    .pipe(gulp.dest('./public/'))
    .pipe(browserSync.reload({
      stream: true
    })) // autoReload
})

gulp.task('sass', function () {
  var plugins = [
    autoprefixer({browsers: ['last 3 version']}) // 最新一版前綴
  ]
  return gulp.src(['./source/scss/**/*.sass', './source/scss/**/*.scss'])
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.sass({
      outputStyle: 'compressed', // compressed | nested
      includePaths: ['./node_modules/bootstrap/scss']
    }).on('error', $.sass.logError))
    // CSS 已經編譯完成
    .pipe($.postcss(plugins))
    .pipe($.if(options.env === 'production', $.cleanCss())) // 假設開發環境則壓縮 CSS
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('./public/css'))
    .pipe(browserSync.reload({
      stream: true
    })) // autoReload
})

gulp.task('vendorsCss', function () {
  return gulp.src(['./vendors/reset.css', './vendors/*.css'])
    .pipe($.sourcemaps.init())
    .pipe($.concatCss('vendors.css'))
    .pipe($.if(options.env === 'production', $.cleanCss()))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('./public/css'))
})

gulp.task('imageMin', () =>
  gulp.src('./source/images/*')
    .pipe($.if(options.env === 'production', $.imagemin([
      $.imagemin.gifsicle({interlaced: true}),
      $.imagemin.jpegtran({progressive: true}),
      $.imagemin.optipng({optimizationLevel: 5}),
      $.imagemin.svgo({
        plugins: [
          {removeViewBox: true},
          {cleanupIDs: false}
        ]
      })]
    )))
    .pipe(gulp.dest('./public/images'))
)
// 搬移 ./source/images 到 ./public/images
gulp.task('moveImg', () =>
  gulp.src('./source/images/*')
    .pipe(gulp.dest('./public/images'))
)

gulp.task('watch', function () {
  gulp.watch(['./source/scss/**/*.sass', './source/scss/**/*.scss'], ['sass'])
  gulp.watch(['./source/**/*.jade'], ['jade'])
  gulp.watch(['./source/js/**/*.js'], ['babel'])
  // gulp.watch('./public/*.html').on('change', browserSync.reload)
})

gulp.task('babel', () => {
  return gulp.src('./source/js/**/*.js')
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.order([
      'vendors/**/*.js',
      'main.js'
    ]))
    .pipe($.concat('main.js'))
    .pipe($.babel({
      presets: ['env']
    }))
    .pipe(
      $.if(options.env === 'production', $.uglify({
        compress: {
          drop_console: true
        }
      }
      )))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('./public/js'))
    .pipe(browserSync.reload({
      stream: true
    })) // autoReload
})

// Bower 管理外部套件
gulp.task('bower', function () {
  return gulp.src(mainBowerFiles())
    .pipe(gulp.dest('./vendors'))
})

// 載入外部 JS Libary
gulp.task('VendorJs', ['bower'], function () {
  return gulp.src([
    './vendors/jquery.js',
    './node_modules/bootstrap/dist/js/bootstrap.bundle.min.js',
    './vendors/**.js'
  ])
    .pipe($.order(['jquery.js', 'bootstrap.bundle.min.js'])) // 排序 Vendors 載入順序
    .pipe($.concat('vendors.js'))
    .pipe($.if(options.env === 'production', $.uglify()))
    .pipe(gulp.dest('./public/js'))
})

// Static server
gulp.task('server', function () {
  browserSync.init({
    server: {
      baseDir: './public'
    },
    reloadDebounce: 2000
  })
})

gulp.task('clean', () => {
  return gulp.src(['./.tmp', './public'], {read: false}) // 選項讀取：false阻止gulp讀取文件的內容，使此任務更快。
    .pipe($.clean())
})

// env
gulp.task('build', gulpSequence('clean', 'jade', 'sass', 'babel', 'vendorsCss', 'VendorJs', 'imageMin'))
gulp.task('default', ['jade', 'sass', 'bower', 'babel', 'vendorsCss', 'VendorJs', 'moveImg', 'server', 'watch'])
