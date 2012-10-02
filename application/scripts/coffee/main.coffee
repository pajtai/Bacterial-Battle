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

bacteria.addPopulation(10, "c1")
bacteria.addPopulation(10, "c2")
bacteria.addPopulation(10, "c3")

bacteria.move()
# TODO: bg color

