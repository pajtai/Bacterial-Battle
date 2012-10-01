class BacteriaModel extends Backbone.Model

  initialize: (@population) ->
    @addBacteria
    @bacteria = {}


  addBacteria: ->
    c = Config
    x = _.random(0 + c.BacteriumRadius, c.BoardWidth - c.BacteriumRadius);
    y = _.random(0 + c.BacteriumRadius, c.BoardHeight - c.BacteriumRadius);

window.BacB.BacteriaModal = BacteriaModel