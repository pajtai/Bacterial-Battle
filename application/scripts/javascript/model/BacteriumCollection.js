(function () {
  var __hasProp = {}.hasOwnProperty,
      __extends = function (child, parent) {
      for (var key in parent) {
        if (__hasProp.call(parent, key)) child[key] = parent[key];
      }
      function ctor() {
        this.constructor = child;
      }
      ctor.prototype = parent.prototype;
      child.prototype = new ctor();
      child.__super__ = parent.prototype;
      return child;
      };

  define(['backbone', 'BacteriumModel'], function (Backbone, BacteriumModel) {
    var BacteriumCollection;
    return BacteriumCollection = (function (_super) {

      __extends(BacteriumCollection, _super);

      function BacteriumCollection() {
        return BacteriumCollection.__super__.constructor.apply(this, arguments);
      }

      BacteriumCollection.prototype.model = BacteriumModel;

      return BacteriumCollection;

    })(Backbone.Collection);
  });

}).call(this);