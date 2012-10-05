BacB = window.BacB
Config = BacB.Config

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

    bac = new BacteriumModel(@getBuid(), clanid, position, radius, @)

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

# This is a model of an individual bacterium
# It doesn't know or care who is watching / listening to it
# It is modular and does it's thing
class BacteriumModel extends Backbone.Model

  initialize: (buid, clanid, position, radius, @outsideWorld) ->
    @set
      'buid': buid
      'clanid': clanid
      'position':
        'x': position.x
        'y': position.y
      'radius': radius
      'vector' :
        'angle' : Config.Bacterium.notAssigned
        'magnitude': Config.Bacterium.defaultVectorLength
      'age' : 0
      'alive': true

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


# This is a collection of individual bacteria
# Backbone provides some useful functionality with collections, making it easy to track changes on any model
# in a collection, to track addition and deletion of models, etc
class BacteriumCollection extends Backbone.Collection

  model: BacteriumModel

# We export the population model
# There is no need for anyone else to know about the individual bacteria
# This keeps things clean and allows future changes to the models without having to worry about
# affecting View functionality
window.BacB.BacteriaModal = BacteriaModel