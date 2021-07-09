const del = require('delete')
// const glob = require('glob')
const gulp = require('gulp')
const uglify = require('gulp-uglify')
const babel = require('gulp-babel')
// const logger = require('gulplog')

// 打包后的目录
// const buildPath = './plugin/build/'
const buildPath = './miniprogram_dist/'
const buildConfig = [
    {
        name: 'index',
        from: './plugin/index.js',
        to: buildPath,
        watch: true
    },
    {
        name: 'modules',
        from: './plugin/modules/*.min.js',
        to: buildPath + 'modules/',
        watch: true
    },
    {
        name: 'WxCanvas2d',
        from: './plugin/WxCanvas2d.js',
        to: buildPath,
        babel: true,
        uglify: true,
        watch: true
    },
    {
        name: 'series',
        from: './plugin/series/*.js',
        to: buildPath + 'series/',
        babel: true,
        uglify: true,
        watch: true
    },
    {
        name: 'utils',
        from: './plugin/utils/*.js',
        to: buildPath + 'utils/',
        babel: true,
        uglify: true,
        watch: true
    }
]

// 清空之前的打包文件
function clear (paths = [buildPath]) {
    return function clear (cb) {
        del(paths, cb)
    }
}

function buildItem (config) {
    return {
        [config.name]: cb => {
            let res = gulp.src(config.from)

            config.babel && (res = res.pipe(babel()))
            config.uglify && (res = res.pipe(uglify()))

            return res.pipe(gulp.dest(config.to))
        }
    }[config.name]
}

// 执行构建
function build (cb) {
    return gulp.parallel(
        ...buildConfig.map(config => buildItem(config))
    )
}

// 监听
buildConfig.forEach(config => {
    if (config.watch) {
        gulp.watch([
            config.from
        ], gulp.series(
            clear([config.to]),
            buildItem(config)
        ))
    }
})

exports.default = gulp.series(
    clear(),
    build()
)
