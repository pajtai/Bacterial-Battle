(function () {

  require.config({
    shim: {
      'lodash': {
        'exports': '_'
      },
      'backbone': {
        'deps': ['lodash', 'jquery'],
        'exports': 'Backbone'
      },
      'raphael': {
        'exports': 'Raphael'
      }
    },
    paths: {
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
    }
  });

  require(['Config', 'MediumView', 'BacteriaModel', 'Mediator'], function (Config, MediumView, BacteriaModel, Mediator) {
    var bacteria, mediator, paper;
    paper = new MediumView();
    bacteria = new BacteriaModel();
    mediator = new Mediator(paper, bacteria);
    paper.addMediator(mediator);
    bacteria.addMediator(mediator);
    bacteria.addPopulation(15, "c1");
    bacteria.addPopulation(15, "c2");
    bacteria.addPopulation(15, "c3");
    return bacteria.move();
  });

}).call(this);