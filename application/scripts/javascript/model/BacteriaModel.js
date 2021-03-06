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

  define(['backbone', 'lodash', 'Config', 'BacteriumModel', 'BacteriumCollection'], function (Backbone, _, Config, BacteriumModel, BacteriumCollection) {
    var BacteriaModel;
    return BacteriaModel = (function (_super) {

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
        this.bacteria.on("change:position", function (bacterium) {
          return _this.mediator.bacteriumMoved(bacterium);
        });
        return this.bacteria.on("change:radius", function (bacterium) {
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
        var bac, c, maxRadius, minRadius, position, radius, velocity;
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
        velocity = _.random(c.Bacterium.velocity.min, c.Bacterium.velocity.max);
        bac = new BacteriumModel(this.getBuid(), clanid, position, radius, velocity, this);
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
  });

}).call(this);