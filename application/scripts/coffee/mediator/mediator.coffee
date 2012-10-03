BacB = window.BacB

class Mediator extends Backbone.Model

  initialize: (@medium, @bacteria) ->

  bacteriumModelAdded: (bacterium) ->
    @medium.addBacterium(bacterium)

  bacteriumMoved: (bacterium) ->
    @medium.moveBacterium(bacterium)

  tick: ->
    @medium.tick()



window.BacB.Mediator = Mediator
