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
    @self.attr("stroke", Config.Stroke);

  getColor: ->

    color = Config.Colors.clanid[@clanid]

    if not color

      if Config.Colors.used.length is Config.Colors.choices.length
        console.log("ERROR: too many clans! Add colors")
        return "#000000"

      loop
        index = _.random(1, Config.Colors.choices.length) - 1
        color = Config.Colors.choices[index]
        break if color not in Config.Colors.used

      Config.Colors.clanid[@clanid] = color
      Config.Colors.used.push(color)

    color

  addListeners: ->
    @self.click =>
      # TODO: have mediator handler this
      $("#info").html("buid: " + @buid + "<br/>" +
                      "clan: " + @clanid + "<br/>" +
                      "x:" + @x + "<br/>" +
                      "y:" + @y)

  move: (x, y) ->
    @self.attr("x", x)
    @self.attr("y", y)


# The medium on which the bacteria live
class MediumView extends Backbone.View

  el: $("#medium")

  initialize: ->
    @render()
    @bacteriumViews = {}

  addMediator: (@mediator) ->

  render: ->
    @paper = Raphael(@el, Config.BoardWidth, Config.BoardHeight)

  raphael: ->
    @paper

  # TODO: move is not working
  addBacterium: (bacterium) ->
    bacteriumView = new BacteriumView({model: bacterium})
    # @bacteriumViews["buid#{bacterium.buid}" ] = bacterium
    bacteriumView.render(@paper)

  moveBacterium: (bacterium) ->
    @bacteriumViews["buid#{bacterium.buid}"].move(bacterium.x, bacterium.y)


window.BacB.MediumView = MediumView
window.BacB.BacteriumView = BacteriumView