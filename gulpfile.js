const {src, dest} = require('gulp');
const gulp = require('gulp');
const del = require('del');
const scss = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const group_css_media = require('gulp-group-css-media-queries');
const clean_css = require('gulp-clean-css');
const rename = require("gulp-rename");
const webpack = require('webpack-stream');


// Папки с ресурсами
const src_folder = 'src';

// Пути к файлам
const path = {
    src: {
        css: src_folder + '/scss/*.scss',
        js: src_folder + '/js/*.js',
    },
    build: {
        css: './css/',
        js: './js/',
    },
    watch: {
        css: src_folder + '/scss/**/*.scss',
        js: src_folder + '/js/**/*.js',
    },
    clean: {
        css: './css/',
        js: './js/',
    }
}

// Меняем при разном режиме разработки
const isDev = true;

//Конфиг для webpack
const webConfig = {
    entry: {
        blog: './src/js/blog.js',
    },
    output: {
        filename: '[name].min.js'
    },
    module: {
        rules: [{
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            }
        }]
    },
    mode: isDev ? 'development' : 'production',
    devtool: isDev ? 'eval-source-map' : 'none'
}


// Все таски
const css = () => {
    return src(path.src.css)
        .pipe(sourcemaps.init())
        .pipe(
            scss({
                outputStyle: 'expanded'
            }).on('error', scss.logError)
        )
        .pipe(autoprefixer({
            grid: true,
            overrideBrowserslist: [
                "last 10 versions",
                "ie 10-11"
            ],
            cascade: false
        }))
        .pipe(group_css_media())
        .pipe(clean_css())
        .pipe(rename({
            extname: '.min.css'
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(dest(path.build.css))
}

const js = () => {
    return src(path.src.js)
        .pipe(webpack(webConfig))
        .pipe(dest(path.build.js))
}

const clean = () => {
    return del(path.clean.css, path.clean.js);
}

const watchFile = () => {
    gulp.watch([path.watch.css], css);
    gulp.watch([path.watch.js], js);
}

const build = gulp.series(clean, gulp.parallel(css, js));
const watch = gulp.parallel(build, watchFile);

exports.css = css;
exports.js = js;
exports.watchFile = watchFile;
exports.build = build;
exports.watch = watch;
exports.default = watch;
