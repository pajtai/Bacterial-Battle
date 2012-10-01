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
      return this.self.attr("stroke", "#adadad");
    };

    BacteriumView.prototype.getColor = function () {
      var choice, color, i, length, oneColor, _fn, _this = this;
      color = Config.Colors.clanid[this.clanid];
      if (!color) {
        i = 0;
        _fn = function (oneColor) {
          return ++i;
        };
        for (oneColor in Config.Colors.choices) {
          _fn(oneColor);
        }
        length = i;
        choice = _.random(1, length);
        i = 1;
        for (oneColor in Config.Colors.choices) {
          if (i === choice) {
            (function (oneColor) {
              color = Config.Colors.choices[oneColor];
              delete Config.Colors.choices[oneColor];
              return Config.Colors.clanid[_this.clanid] = color;
            })(oneColor);
          } else {
            ++i;
          }
        }
      }
      return color;
    };

    BacteriumView.prototype.addListeners = function () {
      var _this = this;
      return this.self.click(function () {
        return $("#info").html("buid: " + _this.buid + "<br/>" + "clan: " + _this.clanid + "<br/>" + "x:" + _this.x + "<br/>" + "y:" + _this.y);
      });
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
      return this.bacteriumViews = [];
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
      this.bacteriumViews.push();
      return bacteriumView.render(this.paper);
    };

    return MediumView;

  })(Backbone.View);

  window.BacB.MediumView = MediumView;

  window.BacB.BacteriumView = BacteriumView;

}).call(this);