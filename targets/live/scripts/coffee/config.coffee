Config =
  BoardWidth: 1130,
  BoardHeight: 500,
  BacteriumRadius: 20
  Colors:
    clanid: {}
    choices: [
      "#0000FF"
      "#00FFFF"
      "#9932CC"
      "#8B0000"
    ],
    used: []
  Stroke: "#adadad"
  Bacterium:
    notAssigned: "not-assigned"
    defaultVectorLength: 3
    maxMovement: 3
    maxTurnDegrees: 45
    tick: 1000 / 10



# Export globals
window.BacB = window.BacB or {}
window.BacB.Config = Config

# TODO: try out: https://github.com/andrewseddon/raphael-zpd