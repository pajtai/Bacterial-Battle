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
      this.clanid = this.model.get('clanid');
      this.glow = false;
      return this.removeGlowOnNext = false;
    };

    BacteriumView.prototype.render = function (paper) {
      var position;
      this.paper = paper;
      position = this.model.get('position');
      this.self = this.paper.circle(position.x, position.y, this.model.get('radius'));
      return this.colorSelf();
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

    BacteriumView.prototype.kill = function () {
      console.log("goone");
      return this.self.remove();
    };

    BacteriumView.prototype.move = function () {
      var position, radius;
      position = this.model.get('position');
      radius = this.model.get('radius');
      this.self.attr("cx", position.x);
      this.self.attr("cy", position.y);
      window.count = window.count || 1;
      window.count = window.count + 1;
      this.self.attr("r", radius);
      if (this.glow) {
        this.removeGlow();
        if (this.removeGlowOnNext) {
          console.log("bam");
          this.glow = false;
          return this.removeGlowOnNext = false;
        } else {
          return this.addGlow();
        }
      }
    };

    BacteriumView.prototype.removeGlow = function () {
      if (this.glow) {
        return this.glow.forEach(function (ellie) {
          return ellie.remove();
        });
      }
    };

    BacteriumView.prototype.removeGlowPermanently = function () {
      return this.removeGlowOnNext = true;
    };

    BacteriumView.prototype.addGlow = function () {
      return this.glow = this.self.glow({
        'color': '#e238a7'
      });
    };

    BacteriumView.prototype.addListener = function (callback) {
      return this.self.click(callback);
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
      var position, vector;
      position = this.glowingBacterium.model.get('position');
      vector = this.glowingBacterium.model.get('vector');
      return $("#info").html("<div>buid:  " + this.glowingBacterium.buid + "</div>            <div>clan:  " + this.glowingBacterium.clanid + "</div>            <div>x: " + (Math.floor(position.x)) + "</div>            <div>y: " + (Math.floor(position.y)) + "</div>            <div>direction: " + vector.angle + "</div>            <div>magnitude: " + vector.magnitude + "</div>            <div>age: " + (this.glowingBacterium.model.get('age')) + "</div>");
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

  window.BacB.MediumView = MediumView;

  window.BacB.BacteriumView = BacteriumView;

}).call(this);