'use strict';

module.exports = function(grunt) {

    grunt.initConfig({

        clean: ['build'],

        jshint: {
            options: {
                jshintrc: '.jshintrc',
                ignores: ['src/js/vendor/**']
            },
            all: {
                files: {
                    src: ['src/js/**/*.js', 'test/specs/**/*.js', 'gruntfile.js']
                }
            }
        },

        sass: {
            all: {
                files: {
                    'build/css/styles.css': 'src/sass/main.scss'
                }
            }
        },

        copy: {
            html: {
                files: [{
                        expand: true,
                        cwd: 'src/',
                        src: ['index.html'],
                        dest: 'build/'
                    }]
            },
            images: {
                files: [{
                    expand: true,
                    cwd: 'src/img/',
                    src: ['**/*.jpg', '**/*.png'],
                    dest: 'build/img/'
                }]
            },
            vendorjs: {
                files: [{
                    expand: true,
                    cwd: 'src/js/',
                    src: [
                        'vendor/angular/angular.min.js',
                        'vendor/jquery/dist/jquery.min.js',
                        'vendor/angular-resource/angular-resource.min.js'
                    ],
                    dest: 'build/js/'
                }]
            },
            templates: {
                files: [{
                    expand: true,
                    cwd: 'src/js/',
                    src: ['templates/**/*.html'],
                    dest: 'build/js/'
                }]
            }
        },

        concat: {
            js: {
                options: {
                    sourceMap: true,
                },
                src: ['src/js/app/vacondos.module.js', 'src/js/**/*.js', 'src/js/**/*.*.js', '!src/js/vendor/**/*.js'],
                dest: 'build/js/main.js'
            }
        },

        watch: {
            sass: {
                files: ['src/sass/**/*.scss'],
                tasks: ['sass']
            },
            js: {
                files: ['src/js/**/*.js'],
                tasks: ['jshint', 'test', 'concat'] //add 'test' to middle
            },
            html: {
                files: ['src/**/*.html', 'src/js/**/*.templates.html'],
                tasks: ['copy:html', 'copy:templates']
            },
            images: {
                files: ['src/img/**/*.jpg', 'src/img/**/*.png'],
                tasks: ['copy:images']
            },
            tests: {
                files: ['test/**/*.js'],
                tasks: ['jshint', 'test']
            }
        },

        karma: {
                all: {
                    options: {
                        frameworks: ['chai', 'mocha'],
                        client: {
                            mocha: {
                                ui: 'tdd'
                            }
                        },
                        browsers: ['PhantomJS'],
                        singleRun: true,
                        files: [
                            'node_modules/angular/angular.js',
                            'node_modules/angular-ui-router/release/angular-ui-router.js',
                            'node_modules/angular-mocks/angular-mocks.js',
                            'src/js/app/vacondos.module.js',
                            'src/js/**/*.js',
                            'test/specs/**/*.js'
                        ],
                        exclude: [
                            'src/js/vendor/**/*.*'
                        ],
                        preprocessors: {
                        'src/js/**/*.js': ['coverage']
                        },
                        reporters: ['dots', 'coverage'],
                        coverageReporter: {
                            type: 'text-summary'
                        }
                    }
                }
            }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-karma');

    grunt.registerTask('test', ['karma']);
    grunt.registerTask('build', ['clean', 'jshint', 'test', 'concat', 'sass', 'copy']); //add 'test'
    grunt.registerTask('default', ['build']);
};
