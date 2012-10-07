define
  BoardWidth: 1130,
  BoardHeight: 500,
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
    radius:
      max: 20
      min: 10
    velocity:
      max: 10
      min: 0
