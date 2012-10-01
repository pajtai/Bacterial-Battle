BacB = window.BacB
Config = BacB.Config

class BacteriaModel extends Backbone.Model

  initialize: (@population) ->
    @bacteria = {}
    i for i in [0..@population] ->
      @addBacteria()

  addBacteria: ->
    c = Config
    x = _.random(0 + c.BacteriumRadius, c.BoardWidth - c.BacteriumRadius);
    y = _.random(0 + c.BacteriumRadius, c.BoardHeight - c.BacteriumRadius);

class BacteriumModel extends Backbone.Model

  initialize: (@buid, @x, @y, @radius) ->

class BacteriumCollection extends Backbone.Collection

  model: BacteriumModel

window.BacB.BacteriaModal = BacteriaModel