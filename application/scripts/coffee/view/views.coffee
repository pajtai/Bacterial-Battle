Config = window.BacB.Config

class BacteriumView extends Backbone.View

  # Each bacterium view is initialized with its corresponding models,
  # since the relationship is 1:1 and permanent
  initialize: ->
    @buid = @model.get('buid')
    @clanid = @model.get('clanid')

  render: (@paper) ->
    position = @model.get('position')
    @self = @paper.circle(position.x, position.y, @model.get('radius'))
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
      position = @model.get('position')
      $("#info").html("buid: " + @buid + "<br/>" +
                      "clan: " + @clanid + "<br/>" +
                      "x:" + position.x + "<br/>" +
                      "y:" + position.y)

  move: () ->

    position = @model.get('position')
    @self.attr("cx", position.x)
    @self.attr("cy", position.y)


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
    @bacteriumViews["buid#{bacterium.get('buid')}" ] = bacteriumView
    bacteriumView.render(@paper)

  moveBacterium: (bacterium) ->

    @bacteriumViews["buid#{bacterium.get('buid')}"].move()


window.BacB.MediumView = MediumView
window.BacB.BacteriumView = BacteriumView
