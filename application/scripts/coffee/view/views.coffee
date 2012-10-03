Config = window.BacB.Config

class BacteriumView extends Backbone.View

  # Each bacterium view is initialized with its corresponding models,
  # since the relationship is 1:1 and permanent
  initialize: ->
    @buid = @model.get('buid')
    @clanid = @model.get('clanid')
    @glow = false
    @removeGlowOnNext = false

  render: (@paper) ->
    position = @model.get('position')
    @self = @paper.circle(position.x, position.y, @model.get('radius'))
    @colorSelf()

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

  move: ->
    position = @model.get('position')

    @self.attr("cx", position.x)
    @self.attr("cy", position.y)

    if @glow
      @removeGlow()
      if @removeGlowOnNext
        console.log("bam")
        @glow = false
        @removeGlowOnNext = false
      else
        @addGlow()

  removeGlow: ->
    if @glow
      @glow.forEach (ellie) ->
        ellie.remove()

  removeGlowPermanently: ->
    @removeGlowOnNext = true

  addGlow: ->
      @glow = @self.glow()

  addListener: (callback) ->
    @self.click(callback)

# The medium on which the bacteria live
class MediumView extends Backbone.View

  el: $("#medium")

  initialize: ->
    @render()
    @bacteriumViews = {}
    @glowingBacterium = false

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

    bacteriumView.addListener =>
      if @glowingBacterium
        @glowingBacterium.removeGlowPermanently()
      if @glowingBacterium is bacteriumView
        @glowingBacterium = false
      else
        @glowingBacterium = bacteriumView
        @glowingBacterium.addGlow()
        @showInfo()

  showInfo: ->
    # TODO: have mediator handler this
    position = @glowingBacterium.model.get('position')
    # TODO: update stats per tick
    # use object variables where possible instead of getting from model again, this should be faster

    $("#info").html(
      "<div>buid:  #{@glowingBacterium.buid}</div>
            <div>clan:  #{@glowingBacterium.clanid}</div>
            <div>x: #{position.x}</div>
            <div>y: #{position.y}</div>
            <div>age: #{@glowingBacterium.model.get('age')}</div>"
    )

  moveBacterium: (bacterium) ->

    @bacteriumViews["buid#{bacterium.get('buid')}"].move()

  tick: ->
    if @glowingBacterium
      @showInfo()


window.BacB.MediumView = MediumView
window.BacB.BacteriumView = BacteriumView
