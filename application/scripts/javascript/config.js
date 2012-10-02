(function () {
  var Config;

  Config = {
    BoardWidth: 500,
    BoardHeight: 500,
    BacteriumRadius: 10,
    Colors: {
      clanid: {},
      choices: ["#0000FF", "#00FFFF", "#9932CC", "#8B0000"],
      used: []
    },
    Stroke: "#adadad",
    Bacterium: {
      maxMovement: 3,
      tick: 1000 / 60
    }
  };

  window.BacB = window.BacB || {};

  window.BacB.Config = Config;

}).call(this);