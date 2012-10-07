Bacterial-Battle
================

[View the Demo and Documentation](http://pajtai.github.com/Bacterial-Battle/)

A game where bacteria battle to survive and evolve.
The game portion is only partially complete.

The project is also a demo of some useful design concepts, workflows, and Javascript tools.

### Installation

If you want to clone the project as a developer you would:

1. Make sure you have the following installed git, node, npm, pygments (`sudo easy_install pygments`, not the npm)
2. Make sure to globally install the following two npms: grunt, docco
3. Clone the repo using:

        git clone git@github.com:pajtai/Bacterial-Battle.git
4. Auto install the npm dependencies that are contained in `package.json` using:

        npm install

### Workflow

1. Start developing by hacking on the coffescript files after running:

        grunt reloadServer
2. Watch your changes auto update in a web browser as you hit save at:

        http://localhost:8001/application/

3. Once you think you're ready for a final run through before pushing live, scan over the beautified js files in
`application` and create documentation using

        grunt developer

4. When everything looks good create a build for the live target using

        grunt live

5. Now copy from `targets/live` to your server. The live target is minified and concatenated js and minified css.

### Goodies

The project uses:

* [MV*](http://addyosmani.com/blog/understanding-mvc-and-mvp-for-javascript-and-backbone-developers/)
(almost MVP since there is a mediator)
    * [Backbone.js](http://backbonejs.org/)
* Continuous build environment and build scripts
    * [Grunt](http://backbonejs.org/)
    * Automated tasks
        * [Coffeescript to JavaScript compilation](https://npmjs.org/package/grunt-coffee)
        * [Beautification of compiled JS for human readability](https://npmjs.org/package/grunt-beautify)
        * [Deletion of unused directories and files](https://npmjs.org/package/grunt-clean)
        * [Copy of modified files to appropriate targets](https://npmjs.org/package/grunt-cp)
        * [Reload web page when source modified](https://npmjs.org/package/grunt-reload)
        * [Documentation generation from source comments](https://npmjs.org/package/grunt-docco)
        * [CSS minification](https://npmjs.org/package/grunt-css)
        * [JS minification and concatenation](https://github.com/gruntjs/grunt/blob/master/docs/task_min.md)
        * [Updating of script references in html files](https://github.com/h5bp/node-build-script/blob/master/tasks/usemin.js)
* Dependency management
    * [NPM](https://npmjs.org/)
    * AMD - [RequireJS](http://requirejs.org/docs/whyamd.html)
* Vector graphics
    * [Raphael](http://raphaeljs.com/)
* Templating and assorted JS utility functionality
    * [Lodash](http://lodash.com/)
* Layout
    * [Bootstrap](http://twitter.github.com/bootstrap/)
* DOM manipulation
    * [jQuery](http://jquery.com/)


### TODO:

* Update tasks for requirjs
    * add bootstrap dropdowns for docs folder
* Add rjs optimization for live build
* Add test suites (Jasmine)
* Add js lint to builds
