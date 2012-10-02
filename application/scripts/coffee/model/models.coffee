BacB = window.BacB
Config = BacB.Config

class BacteriaModel extends Backbone.Model

  initialize: (@population) ->
    @buid = 0
    @bacteria = new BacteriumCollection()

    # fat arrow binds "this" to callback (self = this)
    @bacteria.on "add", (bacterium) =>
      @mediator.bacteriumModelAdded(bacterium)

  addMediator: (@mediator) ->

  addPopulation: (population, clanid) ->
    for i in [1..population] by 1
      @addBacteria(clanid)

  addBacteria: (clanid) ->
    c = Config
    x = _.random(0 + c.BacteriumRadius, c.BoardWidth - c.BacteriumRadius);
    y = _.random(0 + c.BacteriumRadius, c.BoardHeight - c.BacteriumRadius);
    radius = c.BacteriumRadius

    bac = new BacteriumModel(@getBuid(), clanid, x, y, radius, clanid)

    bac.on "change:position", (bacterium) =>
      @mediator.bacteriumMoved(bacterium)

    @bacteria.add(bac)

  getBuid: ->
    ++@buid

  move: ->
    setInterval =>
      @bacteria.forEach (bacterium) =>
        bacterium.move()
    , Config.Bacterium.tick




class BacteriumModel extends Backbone.Model

  initialize: (buid, clanid, x, y, radius) ->
    @set
      'buid': buid
      'clanid': clanid
      'position':
        'x': x
        'y': y
      'radius': radius

  move: ->
    range = Config.Bacterium.maxMovement

    position = @get('position')

    # TODO: try to reuse existing
    newPosition =
      'x': position.x + _.random(-1 * range, range)
      'y': position.y + _.random(-1 * range, range)

    @set
      'position': newPosition




class BacteriumCollection extends Backbone.Collection

  model: BacteriumModel

window.BacB.BacteriaModal = BacteriaModel