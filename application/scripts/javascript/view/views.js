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

  MediumView = (function (_super) {

    __extends(MediumView, _super);

    function MediumView() {
      return MediumView.__super__.constructor.apply(this, arguments);
    }

    MediumView.prototype.el = $("#medium");

    MediumView.prototype.initialize = function () {
      return this.render();
    };

    MediumView.prototype.render = function () {
      return this.elMedium = Raphael(this.el, Config.BoardWidth, Config.BoardHeight);
    };

    MediumView.prototype.raphael = function () {
      return this.elMedium;
    };

    return MediumView;

  })(Backbone.View);

  BacteriumView = (function (_super) {

    __extends(BacteriumView, _super);

    function BacteriumView() {
      return BacteriumView.__super__.constructor.apply(this, arguments);
    }

    BacteriumView.prototype.initialize = function (medium, x, y, radius) {
      this.medium = medium;
      this.x = x;
      this.y = y;
      this.radius = radius;
      return this.render();
    };

    BacteriumView.prototype.render = function () {
      console.log("circle");
      this.medium.circle(this.x, this.y, this.radius);
      return console.log(medium);
    };

    return BacteriumView;

  })(Backbone.View);

  window.BacB.MediumView = MediumView;

  window.BacB.BacteriumView = BacteriumView;

}).call(this);