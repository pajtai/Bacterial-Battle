module.exports = function(grunt) {

    var project = {

        dirs: {
            dev: 'application',
            live: 'targets/live'
        },

        files: {

            scripts:    '/scripts',
            vendor:     '/scripts/vendor',
            coffee:     '/scripts/coffee',
            javascript: '/scripts/javascript',

            any: '**/*',

            dot: {
                coffee: '.coffee',
                javascript: '.js',
                html: '.html'
            }

        }

        },

        tasksConfig = {

            // Remove all junk from compiled only directories
            clean: {
                developer: project.dirs.dev   + project.files.javascript,
                live:      project.dirs.live  + project.files.coffee
            },

            coffee: {
                app: {
                    src: [project.dirs.dev + project.files.coffee + "/" + project.files.any + project.files.dot.coffee],
                    dest: project.dirs.dev + project.files.javascript,
                    options: {
                        // No globals!
                        bare: false,
                        preserve_dirs: true,
                        // Preserve the directory structure of coffee
                        base_path: project.dirs.dev + project.files.coffee
                    }
                }
            },

            beautify: {
                files: [project.dirs.dev + project.files.javascript + "/" + project.files.any + project.files.dot.javascript]
            },

            cp: {
                live: {
                    src: project.dirs.dev,
                    dest: project.dirs.live
                }
            },

            min: {
                live: {
                    src: [
                        project.dirs.live + project.files.vendor + '/jquery.1.8.2.js',
                        project.dirs.live + project.files.vendor + '/raphael.2.1.0.js',
                        project.dirs.live + project.files.vendor + '/lodash.0.7.0.js',
                        project.dirs.live + project.files.vendor + '/backbone.0.9.2.js',
                        project.dirs.live + project.files.javascript + '/config.js',
                        project.dirs.live + project.files.javascript + '/mediator/mediator.js',
                        project.dirs.live + project.files.javascript + '/model/models.js',
                        project.dirs.live + project.files.javascript + '/view/views.js',
                        project.dirs.live + project.files.javascript + '/main.js'
                    ],
                    dest: project.dirs.live + project.files.scripts + '/bacterial-battle.js'
                }
            },

            usemin: {
                html: [project.dirs.live + '/**/*.html']
            },

            // No need to install any plugins
            //
            // Look at the port reload server is running on
            //   e.g. 8001:
            // now open: http://js-demo:8001/developer/index.html
            //
            // at this point you should see an acceptance
            //
            // Running "watch" task
            // Waiting...Tue Sep 25 2012 10:25:08 GMT-0700 (PDT) Connection accepted.
            //
            // If you don's see "connection accepted" it will not work, you have to initially reload
            // the page if it was already open.
            //
            reload: {
                // Visit this port for reload action
                port: 8001,
                proxy: {
                    host: 'localhost',
                    port: 8000,
                    includeReloadScript: true
                }
            },

            watch: {
                files: [
                    project.dirs.dev + '/' + project.files.any + project.files.dot.html,
                    project.dirs.dev + '/' + project.files.any + project.files.dot.coffee
                ],
                tasks: 'developer reload'
            }

        };

    // Grunt tasks configuration
    grunt.initConfig(tasksConfig);

    // To install npm tasks:
    // $ npm install the-task
    // But these should be in the project git already for clarity
    // There are options to install globally
    grunt.loadNpmTasks('grunt-coffee');
    grunt.loadNpmTasks('grunt-clean');
    grunt.loadNpmTasks('grunt-cp');
    grunt.loadNpmTasks('grunt-reload');
    grunt.loadNpmTasks('grunt-beautify');

    grunt.loadTasks('./tasks/');

    // The main tasks.
    grunt.registerTask('developer', 'clean coffee beautify');
    grunt.registerTask('live', 'clean:developer coffee cp:live min usemin');

    grunt.registerTask('reloadServer', 'server reload watch');
}