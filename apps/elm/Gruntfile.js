/*
 * Gruntfile.js
 *
 * Grunt provides configuration for tasks and npm extensions. It reads JSON data from package.json
 * and YAML data from config.yml. Do not edit existing tasks until you're familiar with how each works.
 * Learn more at http://gruntjs.com.
 *
 */

module.exports = function (grunt) {
  'use strict';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    site: grunt.file.readYAML('_config.yml'),
    banner: '/* \n' +
            ' * Copyright © <%= grunt.template.today(\'yyyy\') %> <%= site.title %>\n' +
            ' * \n' +
            ' * <%= pkg.name %>, Updated <%= grunt.template.today(\'yyyy.mm.dd\') %>\n' +
            ' * Code and documentation licensed under the <%= site.license %> license\n' +
            ' * \n' +
            ' */\n',

    shell: {
      gems: {
        command: ['gem update --system --no-document',
                  'gem install github-pages'].join('&&'),
        options: {
          stdout: true
        }
      }
    },

    clean: {
      assets: ['public/css/main.min.css',
               'public/js/main.min.js',
               'public/js/plugins.min.js']
    },

    concat: {
      vendors: {
        src: ['js/plugins/jquery-backstretch.js',
              'js/plugins/bootstrap-validator.js',
              'js/plugins/emailaddress.js',
              'js/plugins/spin.js',
              'js/plugins/ladda.js',
              'js/plugins/masonry.js',
              'js/plugins/imagesloaded.js',
              'js/plugins/jquery-shuffle.js',
              'js/plugins/jquery-bxslider.js',
              'js/plugins/waypoints.js',
              'js/plugins/jquery-counterup.js',
              'js/plugins/jquery-wall.js',
              'js/plugins/twitter-fetcher.js',
              'js/plugins/jquery-simple-text-rotator.js',
              'js/plugins/jquery-throttledresize.js',
              'js/plugins/jquery-scrollto.js',
              'js/plugins/jquery-knob.js'],
        dest: 'public/js/plugins.min.js'
      },

      main: {
        options: {
          banner: '<%= banner %>'
        },
        src: ['js/app.js'],
        dest: 'public/js/main.min.js'
      }
    },

    uglify: {
      vendors: {
        options: {
          report: 'min'
        },
        src: '<%= concat.vendors.dest %>',
        dest: 'public/js/plugins.min.js'
      },

      main: {
        options: {
          banner: '<%= banner %>',
          report: 'min'
        },
        src: '<%= concat.main.dest %>',
        dest: 'public/js/main.min.js'
      }
    },

    recess: {
      unminify: {
        options: {
          compile: true,
          compress: false,
          banner: '<%= banner %>'
        },
        src: ['less/@main.less'],
        dest: 'public/css/main.min.css'
      },
      minify: {
        options: {
          compile: true,
          compress: true,
          banner: '<%= banner %>'
        },
        src: ['<%= recess.unminify.src %>'],
        dest: '<%= recess.unminify.dest %>'
      }
    },

    jscs: {
      src: ['js/*.js'],
      options: {
        config: '.jscsrc'
      }
    },

    pages: {
      test: {},
      start: {
        options: {
          watch: true,
          serve: true,
          baseurl: ['\'\'']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-csscomb');
  grunt.loadNpmTasks('grunt-jekyll-pages');
  grunt.loadNpmTasks('grunt-recess');
  grunt.loadNpmTasks('grunt-shell');

  //grunt.registerTask('build',   ['clean', 'concat', 'uglify', 'recess:minify']);
  grunt.registerTask('build',   ['clean', 'concat', 'uglify']);
  grunt.registerTask('install', ['shell:gems']);
  grunt.registerTask('serve',   ['build', 'pages:start']);
  grunt.registerTask('start',   ['pages:start']);
  grunt.registerTask('test',    ['pages:test']);
};