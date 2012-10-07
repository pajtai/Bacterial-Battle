({
    appDir: "../",
    baseUrl: "scripts/javascript",
    dir: "../../targets/require",
    //Comment out the optimize line if you want
    //the code minified by UglifyJS.
    //optimize: "none",
    shim: {
        'lodash': {
            'exports': '_'
        },
        'backbone': {
            'deps': ['lodash', 'jquery'],
            'exports': 'Backbone'
        }
    },
    paths: {
        'jquery': '../vendor/require-jquery',
        'lodash': '../vendor/lodash.0.7.0',
        'backbone': '../vendor/backbone.0.9.2',
        'raphael': '../vendor/raphael.2.1.0.amd',
        'Config': 'Config',
        'BacteriaModel': 'model/BacteriaModel',
        'BacteriumModel': 'model/BacteriumModel',
        'BacteriumCollection': 'model/BacteriumCollection',
        'BacteriumView': 'view/BacteriumView',
        'MediumView': 'view/MediumView',
        'Mediator': 'mediator/Mediator'
    },

    modules: [
        {
            name: "main",
            exclude: ["jquery"]
        }
    ]
})