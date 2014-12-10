module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
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
  grunt.loadNpmTasks('grunt-contrib-uglify');  
  grunt.loadNpmTasks('grunt-contrib-coffee');

  // Default task(s).
  grunt.registerTask('default', ['less', 'coffee', 'concat', 'uglify']);
};