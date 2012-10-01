# import from global
BacB = window.BacB
Config = BacB.Config
MediumView = BacB.MediumView
BacteriumView = BacB.BacteriumView

medium = new MediumView()
bacterium = new BacteriumView(medium.raphael(), 100, 100, Config.BacteriumRadius)

# TODO: config object
# TODO: bg color
# TODO: multiple bacteria of random sizes and x colors
# TODO: model