const del = require('delete')
// const glob = require('glob')
const gulp = require('gulp')
const uglify = require('gulp-uglify')
const babel = require('gulp-babel')

// 打包后的目录
// const buildPath = './plugin/build/'
const buildPath = './miniprogram_dist/'

// 清空之前的打包文件
function clear (cb) {
    del([buildPath], cb)
}

// 搬运入口文件
function buildIndex (cb) {
    return gulp.src('./plugin/index.js')
        .pipe(gulp.dest(buildPath))
}

// 搬运第三方插件
function buildModules (cb) {
    return gulp.src('./plugin/modules/*.js')
        .pipe(gulp.dest(buildPath + 'modules/'))
}

// 压缩主体代码
function buildMain (cb) {
    return gulp.src('./plugin/WxCanvas2d.js')
        .pipe(babel())
        .pipe(uglify())
        .pipe(gulp.dest(buildPath))
}

// 压缩 series 代码
function buildSeries (cb) {
    return gulp.src('./plugin/series/*.js')
        .pipe(babel())
        .pipe(uglify())
        .pipe(gulp.dest(buildPath + 'series/'))
}

// 压缩 utils 代码
function buildUtils (cb) {
    return gulp.src('./plugin/utils/*.js')
        .pipe(babel())
        .pipe(uglify())
        .pipe(gulp.dest(buildPath + 'utils/'))
}

// 执行构建
function build (cb) {
    return gulp.parallel(
        buildIndex,
        buildModules,
        buildMain,
        buildSeries,
        buildUtils
    )
}

// 监听
gulp.watch([
    './plugin/'
], gulp.series(
    clear,
    build()
))

exports.default = gulp.series(
    clear,
    build()
)
