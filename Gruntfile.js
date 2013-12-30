module.exports = function(grunt) {

	// 1. All configuration goes here 
	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		concat: {
			dist: {
				src: [
					'js/libs/*.js', // All JS in the libs folder
					'js/global.js'  // This specific file
				],
				dest: 'js/build/production.js',
			}
		},

		uglify: {
			build: {
				src: 'js/build/production.js',
				dest: 'js/build/production.min.js'
			}
		},

		imagemin: {
			dynamic: {
				files: [{
					expand: true,
					cwd: 'img/',
					src: ['**/*.{png,jpg,gif}'],
					dest: 'img/build/'
				}]
			}
		},

		sass: {
			dist: {
				options: {
					style: 'compressed'
				},
				files: {
					'css/build/global.css': 'scss/screen.scss'
				}
			} 
		},

		autoprefixer: {
			dist: {
				files: {
					'css/build/global.css': 'css/build/global.css' 
				}
			}
		},

		watch: {
			scripts: {
				files: ['js/*.js', 'js/libs/*.js'],
				tasks: ['concat', 'uglify'],
				options: {
					spawn: false,
					livereload: true,
				},
			},

			css: {
				files: ['scss/*.scss'],
				tasks: ['sass', 'autoprefixer'],
				options: {
					spawn: false,
					livereload: true,
				}
			} 
		},

	});

	// 3. Where we tell Grunt we plan to use this plug-in.
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-devtools');

	// 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
	grunt.registerTask('default', ['concat', 'uglify', 'sass', 'imagemin']);

	grunt.registerTask('dev', ['watch']);

};