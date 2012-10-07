define [
  'backbone'
  'lodash'
  'Config'
], (Backbone, _, Config) ->
  # This is a model of an individual bacterium
  # It doesn't know or care who is watching / listening to it
  # It is modular and does it's thing
  class BacteriumModel extends Backbone.Model

    initialize: (buid, clanid, position, radius, velocity, @outsideWorld) ->
      @set
        'buid': buid
        'clanid': clanid
        'position':
          'x': position.x
          'y': position.y
        'radius': radius
        'vector' :
          'angle' : Config.Bacterium.notAssigned
          'magnitude': velocity
        'age' : 0
        'alive': true
        'eaten' : []
        'strategy' : 'Random Movement'

    update: ->
      @move()
      @age()

    assignAngle: (vector) ->
      vector.angle = _.random(0, 360)

    toRadians: (angle) ->
      angle * (Math.PI / 180);


    move: ->
      range = Config.Bacterium.maxMovement

      # Using vectors for bacterial motion. Randomly changing just x, y positions results in "Brownian motion"
      # Using a vector and slowly changing it give the bacter "momentum"
      # Bacterium doesn't know this, but view are getting changes in x, y bubbled up and are unaware that
      # a vector is involed. This made it easy to initially add in vectors vs pure x,y
      vector = @get('vector')

      if (vector.angle is Config.Bacterium.notAssigned)
        @assignAngle(vector)

      position = @get('position')

      dx = Math.cos(@toRadians(vector.angle)) * vector.magnitude
      dy = Math.sin(@toRadians(vector.angle)) * vector.magnitude

      newPosition =
        'x': position.x + dx
        'y': position.y + dy

      newVector =
        'angle': vector.angle + _.random(-1 * Config.Bacterium.maxTurnDegrees, Config.Bacterium.maxTurnDegrees)
        'magnitude': vector.magnitude

      @set
        'position': newPosition

      @set
        'vector': newVector

      collision = @outsideWorld.bumpsSomething(@)

      # we bumped into something
      if false != collision

        info = collision
        # TODO: move wall into config
        if ('wall' is info.obstacle)

          # If we hit a wall, then smartly turn away from it and move away from it
          switch info.direction
            when 'top'
              newVector.angle = 90
              newPosition.y = newPosition.y + 1
            when 'bottom'
              newVector.angle = 270
              newPosition.y = newPosition.y - 1
            when 'left'
              newVector.angle = 0
              newPosition.x = newPosition.x + 1
            when 'right'
              newVector.angle = 180
              newPosition.x = newPosition.x - 1

          @set
            'position': newPosition

          @set
            'vector': newVector

        if ('bacterium' is info.obstacle)
          @bacterialFight(info.bacterium)

    bacterialFight: (otherBacterium) ->
      otherRadius = otherBacterium.get('radius')
      myRadius = @.get('radius')

      # the tie breaker is here
      # TODO: think more about randomizing tie breaker, etc.
      if myRadius >= otherRadius
        predator = @
        prey = otherBacterium
      else
        predator = otherBacterium
        prey = @

      prey.set
        'alive': false

      eaten = predator.get('eaten')
      eaten.push(prey.get('buid'))


      @outsideWorld.bacterialPredation(predator, prey)

    age: ->
      @set
        'age' : @get('age') + 1

    collidesWith: (position, radius) ->
      return false if not @.get('alive')
      @distanceFrom(position) < radius + @get('radius')

    collidesWithBacterium: (otherBacterium) ->
      return false if not @.get('alive')
      otherPosition = otherBacterium.get('position')
      otherRadius = otherBacterium.get('radius')

      @collidesWith(otherPosition, otherRadius)


    # TODO: do an x,y quick check to reduce number of sqrts you have to do
    distanceFrom: (otherPosition) ->
      position = @get('position')
      length = otherPosition.x - position.x
      height = otherPosition.y - position.y
      distance = Math.sqrt(Math.pow(length, 2) + Math.pow(height, 2))
      distance
