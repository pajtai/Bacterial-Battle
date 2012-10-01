(function () {
  var BacB, BacteriaModel, BacteriumView, Config, Mediator, MediumView, bacteria, mediator, paper;

  BacB = window.BacB;

  Config = BacB.Config;

  Mediator = BacB.Mediator;

  MediumView = BacB.MediumView;

  BacteriumView = BacB.BacteriumView;

  BacteriaModel = BacB.BacteriaModal;

  paper = new MediumView();

  bacteria = new BacteriaModel();

  mediator = new Mediator(paper, bacteria);

  paper.addMediator(mediator);

  bacteria.addMediator(mediator);

  bacteria.addPopulation(40);

}).call(this);