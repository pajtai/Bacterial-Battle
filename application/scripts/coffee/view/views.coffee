Config = window.BacB.Config

# The view for an individual bacterium
# This is a slight deviation from backbone, since this view isn't really a DOM element. It is a
# a graphic which has a DOM element attached to it
class BacteriumView extends Backbone.View

  # Each bacterium view is initialized with its corresponding models,
  # since the relationship is 1:1 and permanent
  initialize: ->
    @buid = @model.get('buid')
    @clanid = @model.get('clanid')
    @glow = false
    @removeGlowOnNext = false

  # Initially creating of bacterium with Raphael's help
  render: (@paper) ->
    position = @model.get('position')
    @self = @paper.circle(position.x, position.y, @model.get('radius'))
    @colorSelf()

  # Color bacterium based on the clan it is in
  colorSelf: ->
    color = @getColor()
    @self.attr("fill", color)
    @self.attr("stroke", Config.Stroke);

  # Choose a random color for the clan if it hasn't already been picked
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

  kill: ->
    @self.remove()

  # Move the bacterium. No real logic here, just check the state of the model.
  move: ->

    position = @model.get('position')
    radius = @model.get('radius')

    @self.attr("cx", position.x)
    @self.attr("cy", position.y)
    window.count = window.count or 1
    window.count = window.count + 1

    @self.attr("r", radius)

    # If the bacterium is glowing, preserve the glow by moving it with the bacterium's movement
    if @glow
      @removeGlow()
      if @removeGlowOnNext
        console.log("bam")
        @glow = false
        @removeGlowOnNext = false
      else
        @addGlow()

  # This will remove the glow, but the glow will be redrawn on the next movement
  removeGlow: ->
    if @glow
      @glow.forEach (ellie) ->
        ellie.remove()

  # Glow will be removed on next movement
  removeGlowPermanently: ->
    @removeGlowOnNext = true

  # TODO: move glow colors into config
  addGlow: ->
      @glow = @self.glow({'color': '#e238a7'})

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
    vector = @glowingBacterium.model.get('vector')
    # TODO: update stats per tick
    # use object variables where possible instead of getting from model again, this should be faster

    $("#info").html(
      "<div>buid:  #{@glowingBacterium.buid}</div>
            <div>clan:  #{@glowingBacterium.clanid}</div>
            <div>x: #{Math.floor(position.x)}</div>
            <div>y: #{Math.floor(position.y)}</div>
            <div>direction: #{vector.angle}</div>
            <div>magnitude: #{vector.magnitude}</div>
            <div>age: #{@glowingBacterium.model.get('age')}</div>"
    )

  moveBacterium: (bacterium) ->
    @bacteriumViews["buid#{bacterium.get('buid')}"].move()

  kill: (bacterium) ->
    @bacteriumViews["buid#{bacterium.get('buid')}"].kill()

  tick: ->
    if @glowingBacterium
      @showInfo()


window.BacB.MediumView = MediumView
window.BacB.BacteriumView = BacteriumView
