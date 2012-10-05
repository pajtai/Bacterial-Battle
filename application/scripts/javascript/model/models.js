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
      while (true) {
        x = _.random(0 + c.BacteriumRadius, c.BoardWidth - c.BacteriumRadius);
        y = _.random(0 + c.BacteriumRadius, c.BoardHeight - c.BacteriumRadius);
        radius = c.BacteriumRadius;
        if (this.noCollision(x, y, radius)) {
          break;
        }
      }
      bac = new BacteriumModel(this.getBuid(), clanid, x, y, radius, clanid);
      return this.bacteria.add(bac);
    };

    BacteriaModel.prototype.noCollision = function (x, y, radius) {
      var collision, _this = this;
      if (this.bacteria.length < 1) {
        return true;
      }
      collision = false;
      this.bacteria.forEach(function (bacterium) {
        if (bacterium.collidesWith(x, y, radius)) {
          return collision = true;
        }
      });
      return collision;
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
          'angle': Config.Bacterium.notAssigned,
          'magnitude': Config.Bacterium.defaultVectorLength
        },
        'age': 0
      });
    };

    BacteriumModel.prototype.update = function () {
      this.move();
      return this.age();
    };

    BacteriumModel.prototype.assignAngle = function (vector) {
      return vector.angle = _.random(0, 360);
    };

    BacteriumModel.prototype.toRadians = function (angle) {
      return angle * (Math.PI / 180);
    };

    BacteriumModel.prototype.move = function () {
      var dx, dy, newPosition, newVector, position, range, vector;
      range = Config.Bacterium.maxMovement;
      vector = this.get('vector');
      if (vector.angle === Config.Bacterium.notAssigned) {
        this.assignAngle(vector);
      }
      position = this.get('position');
      dx = Math.cos(this.toRadians(vector.angle)) * vector.magnitude;
      dy = Math.sin(this.toRadians(vector.angle)) * vector.magnitude;
      newPosition = {
        'x': position.x + dx,
        'y': position.y + dy
      };
      newVector = {
        'angle': vector.angle + _.random(-1 * Config.Bacterium.maxTurnDegrees, Config.Bacterium.maxTurnDegrees),
        'magnitude': vector.magnitude
      };
      this.set({
        'position': newPosition
      });
      return this.set({
        'vector': newVector
      });
    };

    BacteriumModel.prototype.age = function () {
      return this.set({
        'age': this.get('age') + 1
      });
    };

    BacteriumModel.prototype.collidesWith = function (x, y, radius) {
      return this.distanceFrom(x, y) < radius + this.get('radius');
    };

    BacteriumModel.prototype.distanceFrom = function (x, y) {
      var height, length, position;
      position = this.get('position');
      length = x - position.x;
      height = y - position.y;
      return Math.sqrt(length ^ 2 + height ^ 2);
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