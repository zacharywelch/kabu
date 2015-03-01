module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: {
      dist: 'dist',
      docs: 'docs/dist'
    },
    copy: {
      fonts: {
        src: 'fonts/*/*',
        dest: 'dist/'
      },
      images: {
        src: 'images/*',
        dest: 'dist/'        
      },
      docs: {
        src: 'dist/**/*',
        dest: 'docs/'
      },
      download: {
        src: 'archive/<%= pkg.name %>-<%= pkg.version %>-dist.zip',
        dest: 'docs/download/<%= pkg.name %>.zip'
      }
    },    
    less: {
      development: {
        files: {
          "dist/stylesheets/<%= pkg.name %>.css": "less/<%= pkg.name %>.less"
        }
      },
      production: {
        options: {
          cleancss: true
        },
        files: {
          "dist/stylesheets/<%= pkg.name %>.min.css": "less/<%= pkg.name %>.less"
        }
      }
    },
    coffee: {
      glob_to_multiple: {
        expand: true,
        flatten: true,
        cwd: 'coffee/',
        src: ['*.coffee'],
        dest: 'javascripts/',
        ext: '.js'
      }
    },
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['javascripts/**/*.js'],
        dest: 'dist/javascripts/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        mangle: false,
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'dist/javascripts/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },
    compress: {
      main: {
        options: {
          archive: 'archive/<%= pkg.name %>-<%= pkg.version %>-dist.zip',
          mode: 'zip',
          level: 9,
          pretty: true
        },
        files: [
          {
            expand: true,
            cwd: 'dist/',
            src: ['**'],
            dest: '<%= pkg.name %>-<%= pkg.version %>-dist'
          }
        ]
      }
    }
  });

  // Load the plugin that provides the "less" task.
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-concat');  
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-compress');
  
  // CSS task
  grunt.registerTask('css', ['less']);

  // JS task
  grunt.registerTask('js', ['coffee', 'concat', 'uglify']);

  // Copy task
  grunt.registerTask('copy:main', ['copy:fonts', 'copy:images', 'copy:docs']);

  // Default task
  grunt.registerTask('default', ['clean', 'css', 'js', 'copy:main', 'compress', 'copy:download']);
};