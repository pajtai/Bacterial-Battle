(function() {
  var BacteriumView, MediumView, bacterium1, medium,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  MediumView = (function(_super) {

    __extends(MediumView, _super);

    function MediumView() {
      return MediumView.__super__.constructor.apply(this, arguments);
    }

    MediumView.prototype.el = $("#medium");

    MediumView.prototype.initialize = function() {
      return this.render();
    };

    MediumView.prototype.render = function() {
      return this.elMedium = Raphael(this.el, 500, 500);
    };

    MediumView.prototype.raphael = function() {
      return this.elMedium;
    };

    return MediumView;

  })(Backbone.View);

  BacteriumView = (function(_super) {

    __extends(BacteriumView, _super);

    function BacteriumView() {
      return BacteriumView.__super__.constructor.apply(this, arguments);
    }

    BacteriumView.prototype.initialize = function(medium) {
      this.medium = medium;
      return this.render();
    };

    BacteriumView.prototype.render = function() {
      console.log("circle");
      this.medium.circle(100, 100, 5);
      return console.log(medium);
    };

    return BacteriumView;

  })(Backbone.View);

  medium = new MediumView();

  bacterium1 = new BacteriumView(medium.raphael());

}).call(this);
