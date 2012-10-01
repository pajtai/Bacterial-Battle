Config = window.BacB.Config

class BacteriumView extends Backbone.View

  initialize: ->
    @x = @model.x
    @y = @model.y
    @radius = @model.radius
    @buid = @model.buid

  render: (@paper) ->
    @paper.circle(@model.x, @model.y, @model.radius)

# The medium on which the bacteria live
class MediumView extends Backbone.View

  el: $("#medium")

  initialize: ->
    @render()
    @bacteriumViews = []

  addMediator: (@mediator) ->

  render: ->
    @paper = Raphael(@el, Config.BoardWidth, Config.BoardHeight)

  raphael: ->
    @paper

  addBacterium: (bacterium) ->
    bacteriumView = new BacteriumView({model: bacterium})
    @bacteriumViews.push()
    bacteriumView.render(@paper)


window.BacB.MediumView = MediumView
window.BacB.BacteriumView = BacteriumView