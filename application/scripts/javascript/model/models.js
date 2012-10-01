(function () {
  var BacteriaModel, __hasProp = {}.hasOwnProperty,
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

  BacteriaModel = (function (_super) {

    __extends(BacteriaModel, _super);

    function BacteriaModel() {
      return BacteriaModel.__super__.constructor.apply(this, arguments);
    }

    BacteriaModel.prototype.initialize = function (population) {
      this.population = population;
      this.addBacteria;
      return this.bacteria = {};
    };

    BacteriaModel.prototype.addBacteria = function () {
      var c, x, y;
      c = Config;
      x = _.random(0 + c.BacteriumRadius, c.BoardWidth - c.BacteriumRadius);
      return y = _.random(0 + c.BacteriumRadius, c.BoardHeight - c.BacteriumRadius);
    };

    return BacteriaModel;

  })(Backbone.Model);

  window.BacB.BacteriaModal = BacteriaModel;

}).call(this);