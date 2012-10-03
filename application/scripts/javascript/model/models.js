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
      var _this = this;
      this.population = population;
      this.buid = 0;
      this.bacteria = new BacteriumCollection();
      this.bacteria.on("add", function (bacterium) {
        return _this.mediator.bacteriumModelAdded(bacterium);
      });
      return this.bacteria.on("change:position", function (bacterium) {
        return _this.mediator.bacteriumMoved(bacterium);
      });
    };

    BacteriaModel.prototype.addMediator = function (mediator) {
      this.mediator = mediator;
    };

    BacteriaModel.prototype.addPopulation = function (population, clanid) {
      var i, _i, _results;
      _results = [];
      for (i = _i = 1; _i <= population; i = _i += 1) {
        _results.push(this.addBacterium(clanid));
      }
      return _results;
    };

    BacteriaModel.prototype.addBacterium = function (clanid) {
      var bac, c, radius, x, y;
      c = Config;
      x = _.random(0 + c.BacteriumRadius, c.BoardWidth - c.BacteriumRadius);
      y = _.random(0 + c.BacteriumRadius, c.BoardHeight - c.BacteriumRadius);
      radius = c.BacteriumRadius;
      bac = new BacteriumModel(this.getBuid(), clanid, x, y, radius, clanid);
      return this.bacteria.add(bac);
    };

    BacteriaModel.prototype.getBuid = function () {
      return ++this.buid;
    };

    BacteriaModel.prototype.move = function () {
      var _this = this;
      return setInterval(function () {
        _this.bacteria.forEach(function (bacterium) {
          return bacterium.update();
        });
        return _this.mediator.tick();
      }, Config.Bacterium.tick);
    };

    return BacteriaModel;

  })(Backbone.Model);

  BacteriumModel = (function (_super) {

    __extends(BacteriumModel, _super);

    function BacteriumModel() {
      return BacteriumModel.__super__.constructor.apply(this, arguments);
    }

    BacteriumModel.prototype.initialize = function (buid, clanid, x, y, radius) {
      return this.set({
        'buid': buid,
        'clanid': clanid,
        'position': {
          'x': x,
          'y': y
        },
        'radius': radius,
        'vector': {
          'angle': false,
          'length': false
        },
        'age': 0
      });
    };

    BacteriumModel.prototype.update = function () {
      this.move();
      return this.age();
    };

    BacteriumModel.prototype.move = function () {
      var newPosition, position, range;
      range = Config.Bacterium.maxMovement;
      position = this.get('position');
      newPosition = {
        'x': position.x + _.random(-1 * range, range),
        'y': position.y + _.random(-1 * range, range)
      };
      return this.set({
        'position': newPosition
      });
    };

    BacteriumModel.prototype.age = function () {
      return this.set({
        'age': this.get('age') + 1
      });
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