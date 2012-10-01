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
      return this.buid = this.model.buid;
    };

    BacteriumView.prototype.render = function (paper) {
      this.paper = paper;
      return this.paper.circle(this.model.x, this.model.y, this.model.radius);
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