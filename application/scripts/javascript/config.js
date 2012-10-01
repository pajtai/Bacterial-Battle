(function () {
  var Config;

  Config = {
    BoardWidth: 500,
    BoardHeight: 500,
    BacteriumRadius: 10,
    Colors: {
      clanid: {},
      choices: {
        blue: "#0000FF",
        cyan: "#00FFFF",
        darkOrchid: "#9932CC",
        darkRed: "#8B0000"
      },
      used: {}
    }
  };

  window.BacB = window.BacB || {};

  window.BacB.Config = Config;

}).call(this);