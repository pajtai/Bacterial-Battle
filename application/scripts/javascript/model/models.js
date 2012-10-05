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
      var bac, c, maxRadius, minRadius, position, radius;
      c = Config;
      minRadius = c.Bacterium.radius.min;
      maxRadius = c.Bacterium.radius.max;
      while (true) {
        radius = _.random(minRadius, maxRadius);
        position = {};
        position.x = _.random(0 + radius, c.BoardWidth - radius);
        position.y = _.random(0 + radius, c.BoardHeight - radius);
        if (this.noCollision(position, radius)) {
          break;
        }
      }
      bac = new BacteriumModel(this.getBuid(), clanid, position, radius, this);
      return this.bacteria.add(bac);
    };

    BacteriaModel.prototype.bacterialPredation = function (predator, prey) {
      var area1, area2, newRadius, pi, pow, radius1, radius2, totalArea;
      pi = Math.PI;
      pow = Math.pow;
      this.bacteria.remove(prey);
      this.mediator.kill(prey);
      radius1 = predator.get('radius');
      radius2 = prey.get('radius');
      area1 = pi * pow(radius1, 2);
      area2 = pi * pow(radius2, 2);
      totalArea = area1 + area2;
      newRadius = Math.sqrt(totalArea / Math.PI);
      return predator.set({
        'radius': newRadius
      });
    };

    BacteriaModel.prototype.removeBacterium = function (bacterium) {
      return this.bacteria.remove(bacterium);
    };

    BacteriaModel.prototype.noCollision = function (position, radius) {
      var collision;
      collision = false;
      this.bacteria.forEach(function (bacterium) {
        if (bacterium.collidesWith(position, radius)) {
          return collision = true;
        }
      });
      return !collision;
    };

    BacteriaModel.prototype.bacterialCollision = function (thisBacterium) {
      var collision;
      collision = false;
      this.bacteria.forEach(function (bacterium) {
        if ((bacterium !== thisBacterium) && bacterium.collidesWithBacterium(thisBacterium)) {
          return collision = bacterium;
        }
      });
      return collision;
    };

    BacteriaModel.prototype.bumpsSomething = function (thisBacterium) {
      var bumpsWall, collision, info;
      collision = false;
      info = {};
      bumpsWall = this.bumpsWall(thisBacterium);
      if (false === bumpsWall) {
        collision = this.bacterialCollision(thisBacterium);
        if (collision) {
          info.obstacle = 'bacterium';
          info.bacterium = collision;
        }
      } else {
        collision = true;
        info.obstacle = 'wall';
        info.direction = bumpsWall;
      }
      if (!collision) {
        return false;
      } else {
        return info;
      }
    };

    BacteriaModel.prototype.bumpsWall = function (bacterium) {
      var bump, position, radius;
      bump = false;
      position = bacterium.get('position');
      radius = bacterium.get('radius');
      if (position.x - radius < 0) {
        bump = 'left';
      }
      if (position.y - radius < 0) {
        bump = 'top';
      }
      if (position.x + radius > Config.BoardWidth) {
        bump = 'right';
      }
      if (position.y + radius > Config.BoardHeight) {
        bump = 'bottom';
      }
      return bump;
    };

    BacteriaModel.prototype.getBuid = function () {
      return ++this.buid;
    };

    BacteriaModel.prototype.move = function () {
      var _this = this;
      return setInterval(function () {
        _this.bacteria.forEach(function (bacterium) {
          if (bacterium) {
            return bacterium.update();
          }
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

    BacteriumModel.prototype.initialize = function (buid, clanid, position, radius, outsideWorld) {
      this.outsideWorld = outsideWorld;
      return this.set({
        'buid': buid,
        'clanid': clanid,
        'position': {
          'x': position.x,
          'y': position.y
        },
        'radius': radius,
        'vector': {
          'angle': Config.Bacterium.notAssigned,
          'magnitude': Config.Bacterium.defaultVectorLength
        },
        'age': 0,
        'alive': true
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
      var collision, dx, dy, info, newPosition, newVector, position, range, vector;
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
      this.set({
        'vector': newVector
      });
      collision = this.outsideWorld.bumpsSomething(this);
      if (false !== collision) {
        info = collision;
        if ('wall' === info.obstacle) {
          switch (info.direction) {
          case 'top':
            newVector.angle = 90;
            newPosition.y = newPosition.y + 1;
            break;
          case 'bottom':
            newVector.angle = 270;
            newPosition.y = newPosition.y - 1;
            break;
          case 'left':
            newVector.angle = 0;
            newPosition.x = newPosition.x + 1;
            break;
          case 'right':
            newVector.angle = 180;
            newPosition.x = newPosition.x - 1;
          }
          this.set({
            'position': newPosition
          });
          this.set({
            'vector': newVector
          });
        }
        if ('bacterium' === info.obstacle) {
          return this.bacterialFight(info.bacterium);
        }
      }
    };

    BacteriumModel.prototype.bacterialFight = function (otherBacterium) {
      var myRadius, otherRadius, predator, prey;
      otherRadius = otherBacterium.get('radius');
      myRadius = this.get('radius');
      if (myRadius >= otherRadius) {
        predator = this;
        prey = otherBacterium;
      } else {
        predator = otherBacterium;
        prey = this;
      }
      prey.set({
        'alive': false
      });
      return this.outsideWorld.bacterialPredation(predator, prey);
    };

    BacteriumModel.prototype.age = function () {
      return this.set({
        'age': this.get('age') + 1
      });
    };

    BacteriumModel.prototype.collidesWith = function (position, radius) {
      if (!this.get('alive')) {
        return false;
      }
      return this.distanceFrom(position) < radius + this.get('radius');
    };

    BacteriumModel.prototype.collidesWithBacterium = function (otherBacterium) {
      var otherPosition, otherRadius;
      if (!this.get('alive')) {
        return false;
      }
      otherPosition = otherBacterium.get('position');
      otherRadius = otherBacterium.get('radius');
      return this.collidesWith(otherPosition, otherRadius);
    };

    BacteriumModel.prototype.distanceFrom = function (otherPosition) {
      var distance, height, length, position;
      position = this.get('position');
      length = otherPosition.x - position.x;
      height = otherPosition.y - position.y;
      distance = Math.sqrt(Math.pow(length, 2) + Math.pow(height, 2));
      return distance;
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