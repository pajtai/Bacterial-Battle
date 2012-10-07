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

  define(['jquery', 'backbone', 'raphael', 'Config', 'BacteriumView'], function ($, Backbone, Raphael, Config, BacteriumView) {
    var MediumView;
    return MediumView = (function (_super) {

      __extends(MediumView, _super);

      function MediumView() {
        return MediumView.__super__.constructor.apply(this, arguments);
      }

      MediumView.prototype.el = $("#medium");

      MediumView.prototype.initialize = function () {
        this.render();
        this.bacteriumViews = {};
        return this.glowingBacterium = false;
      };

      MediumView.prototype.addMediator = function (mediator) {
        this.mediator = mediator;
      };

      MediumView.prototype.render = function () {
        return this.paper = Raphael(this.el, Config.BoardWidth, Config.BoardHeight);
      };

      MediumView.prototype.raphael = function () {
        return this.paper;
      };

      MediumView.prototype.addBacterium = function (bacterium) {
        var bacteriumView, _this = this;
        bacteriumView = new BacteriumView({
          model: bacterium
        });
        this.bacteriumViews["buid" + (bacterium.get('buid'))] = bacteriumView;
        bacteriumView.render(this.paper);
        return bacteriumView.addListener(function () {
          if (_this.glowingBacterium) {
            _this.glowingBacterium.removeGlowPermanently();
          }
          if (_this.glowingBacterium === bacteriumView) {
            return _this.glowingBacterium = false;
          } else {
            _this.glowingBacterium = bacteriumView;
            _this.glowingBacterium.addGlow();
            return _this.showInfo();
          }
        });
      };

      MediumView.prototype.showInfo = function () {
        var bacterium, position, vector;
        bacterium = this.glowingBacterium.model;
        position = this.glowingBacterium.model.get('position');
        vector = this.glowingBacterium.model.get('vector');
        return $("#info").html("<div class='row well'>          <div class='span1'>buid:<br/>  " + this.glowingBacterium.buid + "</div>          <div class='span1'>clan:<br/>  " + this.glowingBacterium.clanid + "</div>          <div class='span1'>Radius:<br/> " + (Math.floor(bacterium.get('radius'))) + "</div>          <div class='span2'>Eaten:<br/> " + (JSON.stringify(bacterium.get('eaten'))) + "</div>          <div class='span1'>x:<br/> " + (Math.floor(position.x)) + "</div>          <div class='span1'>y:<br/> " + (Math.floor(position.y)) + "</div>          <div class='span1'>direction:<br/> " + vector.angle + "</div>          <div class='span1'>magnitude:<br/> " + vector.magnitude + "</div>          <div class='span1'>age:<br/> " + (this.glowingBacterium.model.get('age')) + "</div>          <div class='span1'>strategy:<br/> " + (bacterium.get('strategy')) + "</div>        </div>");
      };

      MediumView.prototype.moveBacterium = function (bacterium) {
        return this.bacteriumViews["buid" + (bacterium.get('buid'))].move();
      };

      MediumView.prototype.kill = function (bacterium) {
        return this.bacteriumViews["buid" + (bacterium.get('buid'))].kill();
      };

      MediumView.prototype.tick = function () {
        if (this.glowingBacterium) {
          return this.showInfo();
        }
      };

      return MediumView;

    })(Backbone.View);
  });

}).call(this);