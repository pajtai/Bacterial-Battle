define [
  'backbone',
  'lodash'
  'Config'
  'BacteriumModel'
  'BacteriumCollection'
], (Backbone, _, Config, BacteriumModel, BacteriumCollection) ->

  # This is the model of all bacteria
  # It tracks changes in the entire population and controls population wide events
  class BacteriaModel extends Backbone.Model

    initialize: (@population) ->
      @buid = 0
      @bacteria = new BacteriumCollection()

      # fat arrow binds "this" to callback (self = this)
      # listen for the addition of bacteria to the collection
      @bacteria.on "add", (bacterium) =>
        @mediator.bacteriumModelAdded(bacterium)

      # listen to changes in position of the bacteria in the collection
      @bacteria.on "change:position", (bacterium) =>
        @mediator.bacteriumMoved(bacterium)

      @bacteria.on "change:radius", (bacterium) =>
        @mediator.bacteriumMoved(bacterium)

    addMediator: (@mediator) ->

    addPopulation: (population, clanid) ->
      for i in [1..population] by 1
        @addBacterium(clanid)

    addBacterium: (clanid) ->
      c = Config
      minRadius = c.Bacterium.radius.min
      maxRadius = c.Bacterium.radius.max
      # Only add a bacterium in a position where it doesn't overlap another
      loop
        radius = _.random(minRadius, maxRadius)
        position = {}
        position.x = _.random(0 + radius, c.BoardWidth  - radius);
        position.y = _.random(0 + radius, c.BoardHeight - radius);

        break if @noCollision(position, radius)

      velocity = _.random(c.Bacterium.velocity.min, c.Bacterium.velocity.max)
      bac = new BacteriumModel(@getBuid(), clanid, position, radius, velocity, @)

      @bacteria.add(bac)

    bacterialPredation: (predator, prey) ->

      pi = Math.PI
      pow = Math.pow

      @bacteria.remove(prey)
      @mediator.kill(prey)


      radius1 = predator.get('radius')
      radius2 = prey.get('radius')
      area1 = pi * pow(radius1, 2)
      area2 = pi * pow(radius2, 2)
      totalArea = area1 + area2

      newRadius = Math.sqrt(totalArea / Math.PI)

      predator.set
        'radius': newRadius


    removeBacterium: (bacterium) ->
      @bacteria.remove(bacterium)


    # Check if the given x, y, radius would collide with an existing bacterium
    noCollision: (position, radius) ->

      collision = false;

      @bacteria.forEach (bacterium) ->
        if bacterium.collidesWith(position, radius)
          collision = true;

      not collision

    # check if thisBacterium collides with another
    # return the other if yes
    bacterialCollision: (thisBacterium) ->

      collision = false;

      @bacteria.forEach (bacterium) ->
        if (bacterium != thisBacterium) and bacterium.collidesWithBacterium(thisBacterium)
          collision = bacterium;

      collision

    # this model is essentially "the outside world" for a bacterium
    # so it is used as the sense of the bacterium
    # in this case, for collision detection
    bumpsSomething: (thisBacterium) ->

      collision = false
      info = {}

      bumpsWall = @bumpsWall(thisBacterium)

      if false is bumpsWall
        #currentPosition = thisBacterium.get('position')
        collision = @bacterialCollision(thisBacterium)
        if collision
          info.obstacle = 'bacterium'
          info.bacterium = collision
      else
        collision = true
        info.obstacle = 'wall'
        info.direction = bumpsWall

      if not collision
        return false
      else
        return info

    # return false if we did not hit a wall
    # if we do hit a well, then describe which wall
    bumpsWall: (bacterium) ->

      bump = false

      position = bacterium.get('position')
      radius = bacterium.get('radius')

      if position.x - radius < 0
        bump = 'left'

      if position.y - radius < 0
        bump = 'top'

      if position.x + radius > Config.BoardWidth
        bump = 'right'

      if position.y + radius > Config.BoardHeight
        bump = 'bottom'

      bump

    getBuid: ->
      ++@buid

    move: ->
      setInterval =>
        @bacteria.forEach (bacterium) =>
          if bacterium
            bacterium.update()
        @mediator.tick()
      , Config.Bacterium.tick