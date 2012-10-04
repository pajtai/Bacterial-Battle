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
    x = _.random(0 + c.BacteriumRadius, c.BoardWidth - c.BacteriumRadius);
    y = _.random(0 + c.BacteriumRadius, c.BoardHeight - c.BacteriumRadius);
    radius = c.BacteriumRadius

    bac = new BacteriumModel(@getBuid(), clanid, x, y, radius, clanid)

    @bacteria.add(bac)

  getBuid: ->
    ++@buid

  move: ->
    setInterval =>
      @bacteria.forEach (bacterium) =>
        bacterium.update()
      @mediator.tick()
    , Config.Bacterium.tick

# This is a model of an individual bacterium
# It doesn't know or care who is watching / listening to it
# It is modular and does it's thing
class BacteriumModel extends Backbone.Model

  initialize: (buid, clanid, x, y, radius) ->
    @set
      'buid': buid
      'clanid': clanid
      'position':
        'x': x
        'y': y
      'radius': radius
      'vector' :
        'angle' : Config.Bacterium.notAssigned
        'magnitude': Config.Bacterium.defaultVectorLength
      'age' : 0

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

  age: ->
    @set
      'age' : @get('age') + 1

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