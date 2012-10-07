define [
  'backbone',
  'BacteriumModel'
], (Backbone, BacteriumModel) ->
  # This is a collection of individual bacteria
  # Backbone provides some useful functionality with collections, making it easy to track changes on any model
  # in a collection, to track addition and deletion of models, etc
  class BacteriumCollection extends Backbone.Collection

    model: BacteriumModel