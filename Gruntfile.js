'use strict';

var grunt = require('grunt');

grunt.loadNpmTasks('grunt-contrib-less');
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-contrib-copy');

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        less: {
            dev: {
                options: {
                    plugins: [
                        new (require('less-plugin-autoprefix'))({browsers: ['last 3 versions']})
                    ]
                },
                files: {
                    'build/parallax-slideshow.css': 'src/parallax-slideshow.less'
                }
            },
            prod: {
                options: {
                    plugins: [
                        new (require('less-plugin-autoprefix'))({browsers: ['last 2 versions']}),
                        new (require('less-plugin-clean-css'))()
                    ]
                },
                files: {
                    'build/parallax-slideshow.min.css': 'src/parallax-slideshow.less'
                }
            }
        },
        uglify: {
            prod: {
                options: {
                    sourceMap: true,
                    sourceMapName: 'build/parallax-slideshow.min.js.map'
                },
                files: {
                    'build/parallax-slideshow.min.js': ['src/parallax-slideshow.js']
                }
            }
        },
        copy: {
            dev: {
                nonull: true,
                src: 'src/parallax-slideshow.js',
                dest: 'build/parallax-slideshow.js',
            }
        }
    });

    grunt.registerTask('dev', ['less:dev', 'uglify:prod']);
    grunt.registerTask('prod', ['less:prod', 'copy:dev']);
};
