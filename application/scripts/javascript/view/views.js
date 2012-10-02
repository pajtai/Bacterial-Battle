(function () {
  var BacteriumView, Config, MediumView, __hasProp = {}.hasOwnProperty,
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
      },
      __indexOf = [].indexOf ||
      function (item) {
      for (var i = 0, l = this.length; i < l; i++) {
        if (i in this && this[i] === item) return i;
      }
      return -1;
      };

  Config = window.BacB.Config;

  BacteriumView = (function (_super) {

    __extends(BacteriumView, _super);

    function BacteriumView() {
      return BacteriumView.__super__.constructor.apply(this, arguments);
    }

    BacteriumView.prototype.initialize = function () {
      this.buid = this.model.get('buid');
      return this.clanid = this.model.get('clanid');
    };

    BacteriumView.prototype.render = function (paper) {
      var position;
      this.paper = paper;
      position = this.model.get('position');
      this.self = this.paper.circle(position.x, position.y, this.model.get('radius'));
      this.colorSelf();
      return this.addListeners();
    };

    BacteriumView.prototype.colorSelf = function () {
      var color;
      color = this.getColor();
      this.self.attr("fill", color);
      return this.self.attr("stroke", Config.Stroke);
    };

    BacteriumView.prototype.getColor = function () {
      var color, index;
      color = Config.Colors.clanid[this.clanid];
      if (!color) {
        if (Config.Colors.used.length === Config.Colors.choices.length) {
          console.log("ERROR: too many clans! Add colors");
          return "#000000";
        }
        while (true) {
          index = _.random(1, Config.Colors.choices.length) - 1;
          color = Config.Colors.choices[index];
          if (__indexOf.call(Config.Colors.used, color) < 0) {
            break;
          }
        }
        Config.Colors.clanid[this.clanid] = color;
        Config.Colors.used.push(color);
      }
      return color;
    };

    BacteriumView.prototype.addListeners = function () {
      var _this = this;
      return this.self.click(function () {
        var position;
        position = _this.model.get('position');
        return $("#info").html("buid: " + _this.buid + "<br/>" + "clan: " + _this.clanid + "<br/>" + "x:" + position.x + "<br/>" + "y:" + position.y);
      });
    };

    BacteriumView.prototype.move = function () {
      var position;
      position = this.model.get('position');
      this.self.attr("cx", position.x);
      return this.self.attr("cy", position.y);
    };

    return BacteriumView;

  })(Backbone.View);

  MediumView = (function (_super) {

    __extends(MediumView, _super);

    function MediumView() {
      return MediumView.__super__.constructor.apply(this, arguments);
    }

    MediumView.prototype.el = $("#medium");

    MediumView.prototype.initialize = function () {
      this.render();
      return this.bacteriumViews = {};
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
      var bacteriumView;
      bacteriumView = new BacteriumView({
        model: bacterium
      });
      this.bacteriumViews["buid" + (bacterium.get('buid'))] = bacteriumView;
      return bacteriumView.render(this.paper);
    };

    MediumView.prototype.moveBacterium = function (bacterium) {
      return this.bacteriumViews["buid" + (bacterium.get('buid'))].move();
    };

    return MediumView;

  })(Backbone.View);

  window.BacB.MediumView = MediumView;

  window.BacB.BacteriumView = BacteriumView;

}).call(this);