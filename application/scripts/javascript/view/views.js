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
      this.x = this.model.x;
      this.y = this.model.y;
      this.radius = this.model.radius;
      this.buid = this.model.buid;
      return this.clanid = this.model.clanid;
    };

    BacteriumView.prototype.render = function (paper) {
      this.paper = paper;
      this.self = this.paper.circle(this.model.x, this.model.y, this.model.radius);
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
        return $("#info").html("buid: " + _this.buid + "<br/>" + "clan: " + _this.clanid + "<br/>" + "x:" + _this.x + "<br/>" + "y:" + _this.y);
      });
    };

    BacteriumView.prototype.move = function (x, y) {
      this.self.attr("x", x);
      return this.self.attr("y", y);
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
      return bacteriumView.render(this.paper);
    };

    MediumView.prototype.moveBacterium = function (bacterium) {
      return this.bacteriumViews["buid" + bacterium.buid].move(bacterium.x, bacterium.y);
    };

    return MediumView;

  })(Backbone.View);

  window.BacB.MediumView = MediumView;

  window.BacB.BacteriumView = BacteriumView;

}).call(this);