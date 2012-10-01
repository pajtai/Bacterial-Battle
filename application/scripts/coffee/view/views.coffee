Config = window.BacB.Config

# The medium on which the bacteria live
class MediumView extends Backbone.View

  el: $("#medium")

  initialize: ->
    @render()

  render: ->
    @elMedium = Raphael(@el, Config.BoardWidth, Config.BoardHeight)

  raphael: ->
    @elMedium

class BacteriumView extends Backbone.View

  initialize: (@medium, @x, @y, @radius) ->
    @render()

  render: ->
    console.log("circle")
    @medium.circle(@x, @y, @radius)
    console.log(medium)

window.BacB.MediumView = MediumView
window.BacB.BacteriumView = BacteriumView