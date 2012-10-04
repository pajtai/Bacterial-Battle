# import from global
# TODO: redo these imports the normal way with passing in as argument of self executing method
BacB = window.BacB
Config = BacB.Config
Mediator = BacB.Mediator
MediumView = BacB.MediumView
BacteriumView = BacB.BacteriumView
BacteriaModel = BacB.BacteriaModal

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
bacteria.addPopulation(10, "c1")
bacteria.addPopulation(10, "c2")
bacteria.addPopulation(10, "c3")

bacteria.move()
