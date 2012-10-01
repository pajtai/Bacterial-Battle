Config = window.BacB.Config

class BacteriumView extends Backbone.View

  initialize: ->
    @x = @model.x
    @y = @model.y
    @radius = @model.radius
    @buid = @model.buid
    @clanid = @model.clanid

  render: (@paper) ->
    @self = @paper.circle(@model.x, @model.y, @model.radius)
    @colorSelf()
    @addListeners()

  colorSelf: ->
    color = @getColor()
    @self.attr("fill", color)
    @self.attr("stroke", "#adadad");


  # TODO: fix this method - it is horrible and flawed
  getColor: ->
    color = Config.Colors.clanid[@clanid]
    if not color

      i = 0
      for oneColor of Config.Colors.choices
        do (oneColor) ->
          ++i

      length = i
      choice = _.random(1, length)
      i = 1
      for oneColor of Config.Colors.choices
        if i == choice
          do (oneColor) =>
            color = Config.Colors.choices[oneColor]
            delete Config.Colors.choices[oneColor]

            Config.Colors.clanid[@clanid] = color
        else
          ++i

    color

  addListeners: ->
    @self.click =>
      # TODO: have mediator handler this
      $("#info").html("buid: " + @buid + "<br/>" +
                      "clan: " + @clanid + "<br/>" +
                      "x:" + @x + "<br/>" +
                      "y:" + @y)


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