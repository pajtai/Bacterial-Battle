BacB = window.BacB

# Currently the mediator is just a proxy... it doesn't really do anything
# But having a mediator allows us the option of having a little more control over how to handle model changes
# or view updates
# A common problem with pub sub variations is that it is easy to get into a situation where the order of published
# events is important, but bugs are caused by the variability of that order. A mediator can often help out with this
# It also helps decouple the model and views (even though some models are passed in to the views)
# This makes testing much easier.
class Mediator extends Backbone.Model

  initialize: (@medium, @bacteria) ->

  bacteriumModelAdded: (bacterium) ->
    @medium.addBacterium(bacterium)

  bacteriumMoved: (bacterium) ->
    @medium.moveBacterium(bacterium)

  tick: ->
    @medium.tick()

  kill: (bacterium) ->
    @medium.kill(bacterium)


window.BacB.Mediator = Mediator
