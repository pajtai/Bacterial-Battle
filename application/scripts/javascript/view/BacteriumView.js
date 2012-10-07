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
      },
      __indexOf = [].indexOf ||
      function (item) {
      for (var i = 0, l = this.length; i < l; i++) {
        if (i in this && this[i] === item) return i;
      }
      return -1;
      };

  define(['lodash', 'backbone', 'Config'], function (_, Backbone, Config) {
    var BacteriumView;
    return BacteriumView = (function (_super) {

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
  });

}).call(this);