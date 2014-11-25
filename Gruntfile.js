module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    less: {
      development: {
        files: {
          "css/cb-design-framework.css": "less/cb-design-framework.less"
        }
      },
      production: {
        options: {
          cleancss: true
        },
        files: {
          "css/cb-design-framework.min.css": "less/cb-design-framework.less"
        }
      }
    }    
  });

  // Load the plugin that provides the "less" task.
  grunt.loadNpmTasks('grunt-contrib-less');

  // Default task(s).
  grunt.registerTask('default', ['less']);
};