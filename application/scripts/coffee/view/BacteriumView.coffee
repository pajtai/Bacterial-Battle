define [
  'lodash'
  'backbone'
  'Config'
]
, (_, Backbone, Config) ->
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