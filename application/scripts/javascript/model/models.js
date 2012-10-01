(function () {
  var BacB, BacteriaModel, BacteriumCollection, BacteriumModel, Config, __hasProp = {}.hasOwnProperty,
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

  BacB = window.BacB;

  Config = BacB.Config;

  BacteriaModel = (function (_super) {

    __extends(BacteriaModel, _super);

    function BacteriaModel() {
      return BacteriaModel.__super__.constructor.apply(this, arguments);
    }

    BacteriaModel.prototype.initialize = function (population) {
      var i, _i, _j, _len, _ref, _ref1, _results, _results1;
      this.population = population;
      this.bacteria = {};
      _ref1 = (function () {
        _results1 = [];
        for (var _j = 0, _ref = this.population; 0 <= _ref ? _j <= _ref : _j >= _ref; 0 <= _ref ? _j++ : _j--) {
          _results1.push(_j);
        }
        return _results1;
      }).apply(this)(function () {
        return this.addBacteria();
      });
      _results = [];
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        i = _ref1[_i];
        _results.push(i);
      }
      return _results;
    };

    BacteriaModel.prototype.addBacteria = function () {
      var c, x, y;
      c = Config;
      x = _.random(0 + c.BacteriumRadius, c.BoardWidth - c.BacteriumRadius);
      return y = _.random(0 + c.BacteriumRadius, c.BoardHeight - c.BacteriumRadius);
    };

    return BacteriaModel;

  })(Backbone.Model);

  BacteriumModel = (function (_super) {

    __extends(BacteriumModel, _super);

    function BacteriumModel() {
      return BacteriumModel.__super__.constructor.apply(this, arguments);
    }

    BacteriumModel.prototype.initialize = function (buid, x, y, radius) {
      this.buid = buid;
      this.x = x;
      this.y = y;
      this.radius = radius;
    };

    return BacteriumModel;

  })(Backbone.Model);

  BacteriumCollection = (function (_super) {

    __extends(BacteriumCollection, _super);

    function BacteriumCollection() {
      return BacteriumCollection.__super__.constructor.apply(this, arguments);
    }

    BacteriumCollection.prototype.model = BacteriumModel;

    return BacteriumCollection;

  })(Backbone.Collection);

  window.BacB.BacteriaModal = BacteriaModel;

}).call(this);