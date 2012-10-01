BacB = window.BacB

class Mediator extends Backbone.Model

  initialize: (@medium, @bacteria) ->

  bacteriumModelAdded: (bacterium) ->
    @medium.addBacterium(bacterium)


window.BacB.Mediator = Mediator
