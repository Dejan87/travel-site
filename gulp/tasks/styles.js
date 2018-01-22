var gulp  = require("gulp"),
    postcss = require("gulp-postcss"),
    cssvars = require("postcss-simple-vars"),
    nested = require("postcss-nested"),
    autoprefixer = require("gulp-autoprefixer");

gulp.task("styles", function(){
	return gulp.src("./app/assets/styles/css/app.css")
			.pipe(autoprefixer({
				browsers: ['last 2 versions'],
				cascade: true
            }))
            .on("error", function(errorInfo){
                console.log(errorInfo.toString());
                this.emit("end");
            })
			.pipe(gulp.dest("./app/temp/styles"));
});