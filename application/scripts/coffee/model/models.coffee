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

  addPopulation: (@population) ->
    for i in [1..@population] by 1
      @addBacteria()

  addBacteria: ->
    c = Config
    x = _.random(0 + c.BacteriumRadius, c.BoardWidth - c.BacteriumRadius);
    y = _.random(0 + c.BacteriumRadius, c.BoardHeight - c.BacteriumRadius);
    radius = c.BacteriumRadius
    @bacteria.add(new BacteriumModel(@getBuid(), x, y, radius))

  getBuid: ->
    ++@buid


class BacteriumModel extends Backbone.Model

  initialize: (@buid, @x, @y, @radius) ->


class BacteriumCollection extends Backbone.Collection

  model: BacteriumModel

window.BacB.BacteriaModal = BacteriaModel