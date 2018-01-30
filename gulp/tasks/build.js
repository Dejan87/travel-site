var gulp = require("gulp"),
    imagemin = require("gulp-imagemin"),
    del = require("del"),
    usemin = require("gulp-usemin"),
    rev = require("gulp-rev"),
    cssnano = require("gulp-cssnano"),
    uglify = require("gulp-uglify"),
    browserSync = require("browser-sync").create();

/**
 * Task will run preview of the dist folder, after minifying, compressing, and moving all of the files
 */
gulp.task("previewDist", function() {
    browserSync.init({
        notify: false,
		server: {
			baseDir: "docs"
		}
	});
});

gulp.task("deleteDistFolder", ["icons"], function() {
    return del("./docs");
});

gulp.task("copyGeneralFiles", ["deleteDistFolder"], function() {
    var pathsToCopy = [
        "./app/**/*",
        "!./app/index.html",
        "!./app/assets/images/**",
        "!./app/assets/styles/**",
        "!./app/assets/scripts/**",
        "!./app/temp",
        "!./app/temp/**"
    ]

    return gulp.src(pathsToCopy)
        .pipe(gulp.dest("./docs"));
});

/** 
 * Task that copy all of our image files to dist folder
 * And also compressed them before they reach their destination
 */
gulp.task("optimizeImages", ["deleteDistFolder"], function() {
    return gulp.src(["./app/assets/images/**/*", "!./app/assets/images/icons", "!./app/assets/images/icons/**/*"]) // ! at the beginning means to exclude those files
        .pipe(imagemin({
            progressive: true, // will optimize jpeg images even further
            interlaced: true, // help with gif images
            multipass: true // helps with svg files
        }))
        .pipe(gulp.dest("./docs/assets/images"));
});

gulp.task("useminTrigger", ["deleteDistFolder"], function() {
    gulp.start("usemin");
});

/**
 * Revision, compress, and copy css/js files to dist folder from html
 * html file contains comments that instructs usemin to extract css/js files
 * html is also moved to dist folder
 * usemin task will not run until styles and scripts tasks are finished building fresh copies of css and js files
 */
gulp.task("usemin", ["styles", "scripts"], function() {
    return gulp.src("./app/index.html")
        .pipe(usemin({
            css: [function() {return rev()}, function() {return cssnano()}],
            js: [function() {return rev()}, function() {return uglify()}]
        }))
        .pipe(gulp.dest("./docs"));
});

gulp.task("build", ["deleteDistFolder", "copyGeneralFiles", "optimizeImages", "useminTrigger"]);