require.config
  # The shim config allows us to configure dependencies for
  # scripts that do not call _define()_ to register a module
  shim:
    'lodash':
      'exports': '_'
    'backbone':
      'deps': [
        'lodash'
        'jquery'
      ]
      'exports': 'Backbone'
  paths:
    'lodash'              : '../vendor/lodash.0.7.0'
    'backbone'            : '../vendor/backbone.0.9.2'
    'raphael'             : '../vendor/raphael.2.1.0.amd'

    'Config'              : 'Config'

    'BacteriaModel'       : 'model/BacteriaModel'
    'BacteriumModel'      : 'model/BacteriumModel'
    'BacteriumCollection' : 'model/BacteriumCollection'

    'BacteriumView'       : 'view/BacteriumView'
    'MediumView'          : 'view/MediumView'

    'Mediator'            : 'mediator/Mediator'

require [
    'Config'
    'MediumView'
    'BacteriaModel'
    'Mediator'
  ]
  , (Config, MediumView, BacteriaModel, Mediator) ->

    # setup mediator between model and view
    paper = new MediumView()
    bacteria = new BacteriaModel()

    mediator = new Mediator(paper, bacteria)

    # The mediator is used as the link between the models and the views
    # Do not want to link them directly, since as things get more complicated we'll
    # want to ensure the order of events in cases of certain multiple updates, etc.
    paper.addMediator(mediator)
    bacteria.addMediator(mediator)

    # setup the bacteria - views are now listening via backbone / mediator
    bacteria.addPopulation(15, "c1")
    bacteria.addPopulation(15, "c2")
    bacteria.addPopulation(15, "c3")

    bacteria.move()
