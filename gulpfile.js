const { src, dest, watch, parallel, series } = require('gulp')
const ts = require('gulp-typescript')
const rename = require('gulp-rename')
const del = require('del');
const { spawn } = require('child_process')

// 删除目录
function cleanTask(cb) {
    return del(['./dist', './out'], cb);
}

function buildRenderer() {
    return spawn('yarn', ['build:renderer'], { stdio: ['pipe', process.stdout, process.stderr] })
}

function buildMain() {
    return src('src/main/**')
        .pipe(ts())
        .pipe(rename(path => {
            path.extname = '.js'
        }))
        .pipe(dest('dist/main/'))
}

function devRenderer() {
    return spawn('yarn', ['dev:renderer'], { stdio: ['pipe', process.stdout, process.stderr] })
}
function watchMain() {
    return watch(['src/main/**/*'], buildMain)
}
function devMain() {
    return spawn('yarn', ['dev:main'], { stdio: ['pipe', process.stdout, process.stderr] })
}

exports.buildMain = buildMain
exports.build = series(cleanTask, buildRenderer, buildMain)// 要electron编译加 makeTask
exports.dev = parallel(devRenderer, series(buildMain, devMain), watchMain)
