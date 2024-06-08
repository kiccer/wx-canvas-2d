const del = require('delete')
// const glob = require('glob')
const gulp = require('gulp')
const uglify = require('gulp-uglify')
const babel = require('gulp-babel')
// const concat = require('gulp-concat')
// const logger = require('gulplog')

// 命令行传参
const cmdParams = {
    watch: process.argv.includes('--watch')
}

// 打包后的目录
const buildFrom = './plugin/'
// const buildTo = './plugin/build/'
const buildTo = './miniprogram_dist/'
const buildConfig = [
    {
        name: 'index',
        from: buildFrom + 'index.js',
        to: buildTo,
        watch: true
    },
    {
        name: 'modules',
        from: buildFrom + 'modules/*.min.js',
        to: buildTo + 'modules/',
        watch: true
    },
    {
        name: 'WxCanvas2d',
        from: buildFrom + 'WxCanvas2d.js',
        to: buildTo,
        babel: true,
        uglify: true,
        watch: true
    },
    {
        name: 'series',
        from: buildFrom + 'series/*.js',
        to: buildTo + 'series/',
        babel: true,
        uglify: true,
        watch: true
    },
    {
        name: 'utils',
        from: buildFrom + 'utils/*.js',
        to: buildTo + 'utils/',
        babel: true,
        uglify: true,
        watch: true
    },
    {
        name: 'types',
        from: buildFrom + 'index.d.ts',
        to: buildTo,
        babel: false,
        uglify: false,
        watch: true
    }
]

// 清空之前的打包文件
function clear (paths = [buildTo]) {
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
if (cmdParams.watch) {
    buildConfig.forEach(config => {
        if (config.watch) {
            const paths = config.from.split('/')
            const last = paths[paths.length - 1]
            const fileScope = '/' + (paths[paths.length - 2] === '**' ? '**/' + last : last)

            gulp.watch([
                config.from
            ], gulp.series(
                clear([buildTo + fileScope]),
                buildItem(config)
            ))
        }
    })
}

exports.default = gulp.series(
    clear(),
    build()
)
