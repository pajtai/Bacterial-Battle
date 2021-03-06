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

  define(['backbone'], function (Backbone) {
    var Mediator;
    return Mediator = (function (_super) {

      __extends(Mediator, _super);

      function Mediator() {
        return Mediator.__super__.constructor.apply(this, arguments);
      }

      Mediator.prototype.initialize = function (medium, bacteria) {
        this.medium = medium;
        this.bacteria = bacteria;
      };

      Mediator.prototype.bacteriumModelAdded = function (bacterium) {
        return this.medium.addBacterium(bacterium);
      };

      Mediator.prototype.bacteriumMoved = function (bacterium) {
        return this.medium.moveBacterium(bacterium);
      };

      Mediator.prototype.tick = function () {
        return this.medium.tick();
      };

      Mediator.prototype.kill = function (bacterium) {
        return this.medium.kill(bacterium);
      };

      return Mediator;

    })(Backbone.Model);
  });

}).call(this);