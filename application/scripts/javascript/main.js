(function () {
  var BacB, BacteriumView, Config, MediumView, bacterium, medium;

  BacB = window.BacB;

  Config = BacB.Config;

  MediumView = BacB.MediumView;

  BacteriumView = BacB.BacteriumView;

  medium = new MediumView();

  bacterium = new BacteriumView(medium.raphael(), 100, 100, Config.BacteriumRadius);

}).call(this);