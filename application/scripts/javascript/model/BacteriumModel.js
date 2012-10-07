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

  define(['backbone', 'lodash', 'Config'], function (Backbone, _, Config) {
    var BacteriumModel;
    return BacteriumModel = (function (_super) {

      __extends(BacteriumModel, _super);

      function BacteriumModel() {
        return BacteriumModel.__super__.constructor.apply(this, arguments);
      }

      BacteriumModel.prototype.initialize = function (buid, clanid, position, radius, velocity, outsideWorld) {
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
            'magnitude': velocity
          },
          'age': 0,
          'alive': true,
          'eaten': [],
          'strategy': 'Random Movement'
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
        var eaten, myRadius, otherRadius, predator, prey;
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
        eaten = predator.get('eaten');
        eaten.push(prey.get('buid'));
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
  });

}).call(this);