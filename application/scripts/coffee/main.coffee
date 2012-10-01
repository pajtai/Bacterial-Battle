# import from global
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

paper.addMediator(mediator)
bacteria.addMediator(mediator)

# begin app

bacteria.addPopulation(40)

# TODO: bg color
# TODO: multiple bacteria of random sizes and x colors
