define [
  'jquery'
  'backbone'
  'raphael'
  'Config'
  'BacteriumView'
]
, ($, Backbone, Raphael, Config, BacteriumView) ->

  # The view for an individual bacterium
  # This is a slight deviation from backbone, since this view isn't really a DOM element. It is a
  # a graphic which has a DOM element attached to it

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
      bacterium = @glowingBacterium.model
      position = @glowingBacterium.model.get('position')
      vector = @glowingBacterium.model.get('vector')
      # TODO: update stats per tick
      # use object variables where possible instead of getting from model again, this should be faster

      $("#info").html(
        "<div class='row well'>
          <div class='span1'>buid:<br/>  #{@glowingBacterium.buid}</div>
          <div class='span1'>clan:<br/>  #{@glowingBacterium.clanid}</div>
          <div class='span1'>Radius:<br/> #{Math.floor(bacterium.get('radius'))}</div>
          <div class='span2'>Eaten:<br/> #{JSON.stringify(bacterium.get('eaten'))}</div>
          <div class='span1'>x:<br/> #{Math.floor(position.x)}</div>
          <div class='span1'>y:<br/> #{Math.floor(position.y)}</div>
          <div class='span1'>direction:<br/> #{vector.angle}</div>
          <div class='span1'>magnitude:<br/> #{vector.magnitude}</div>
          <div class='span1'>age:<br/> #{@glowingBacterium.model.get('age')}</div>
          <div class='span1'>strategy:<br/> #{bacterium.get('strategy')}</div>
        </div>"
      )

    moveBacterium: (bacterium) ->
      @bacteriumViews["buid#{bacterium.get('buid')}"].move()

    kill: (bacterium) ->
      @bacteriumViews["buid#{bacterium.get('buid')}"].kill()

    tick: ->
      if @glowingBacterium
        @showInfo()
