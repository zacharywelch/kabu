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
        src: 'img/*',
        dest: 'dist/'        
      },
      docs: {
        src: 'dist/**/*',
        dest: 'docs/'
      }
    },    
    less: {
      development: {
        files: {
          "dist/css/<%= pkg.name %>.css": "less/<%= pkg.name %>.less"
        }
      },
      production: {
        options: {
          cleancss: true
        },
        files: {
          "dist/css/<%= pkg.name %>.min.css": "less/<%= pkg.name %>.less"
        }
      }
    },
    coffee: {
      glob_to_multiple: {
        expand: true,
        flatten: true,
        cwd: 'coffee/',
        src: ['*.coffee'],
        dest: 'js/',
        ext: '.js'
      }
    },
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['js/**/*.js'],
        dest: 'dist/js/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        mangle: false,
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'dist/js/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
        }
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

  // CSS task
  grunt.registerTask('css', ['less']);

  // JS task
  grunt.registerTask('js', ['coffee', 'concat', 'uglify']);

  // Default task
  grunt.registerTask('default', ['clean', 'css', 'js', 'copy']);
};