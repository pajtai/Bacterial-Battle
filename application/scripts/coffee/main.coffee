
# The medium on which the bacteria live
class MediumView extends Backbone.View

  el: $("#medium")

  initialize: ->
    @render()

  render: ->
    @elMedium = Raphael(@el, 500, 500)

  raphael: ->
    @elMedium

class BacteriumView extends Backbone.View

  initialize: (@medium) ->
    @render()

  render: ->
    console.log("circle")
    @medium.circle(100, 100, 5)
    console.log(medium)

medium = new MediumView()
bacterium1 = new BacteriumView(medium.raphael())

# TODO: config object
# TODO: bg color
# TODO: multiple bacteria of random sizes and x colors
# TODO: model