/*!
 * jQuery lightweight plugin boilerplate
 * Original author: @ajpiano
 * Further changes, comments: @addyosmani
 * Licensed under the MIT license
 */

;(function ( $, window, document, undefined ) {
  var pluginName = 'd3SegmentedChart';
  var defaults = {
    w: 960,
    h: 500 - .5 - 20,
    p: 20,
    color_from: "#aad",
    color_to: "#556"
  };

  // The actual plugin constructor
  function Plugin( element, options ) {
    _this = this;
    this.element = element;

    // jQuery has an extend method that merges the
    // contents of two or more objects, storing the
    // result in the first object. The first object
    // is generally empty because we don't want to alter
    // the default options for future instances of the plugin
    this.settings = $.extend( {}, defaults, options) ;

    this._defaults = defaults;
    this._name = pluginName;
    this._n = this.settings.data.length || 2;
    this._m = this.settings.data.length || 2;
    this._w = this.settings.w;
    this._p = this.settings.p;
    this._h = this.settings.h - .5 - this.settings.p;
    this._color = d3.interpolateRgb(this.settings.color_from, this.settings.color_to);
    // this._data = this._data || d3.layout.stack()(stream_layers(this._n, this._m, .1));
    this._data = this._data || d3.layout.stack()(this.settings.data);
    this._mx = this._m;
    this._my = d3.max(this._data, function(d) {
      return d3.max(d, function(d) {
        return d.y0 + d.y;
      });
    });
    this._mz = d3.max(this._data, function(d) {
      return d3.max(d, function(d) {
        return d.y;
      });
    }),

    this._x  = function(d) { return d.x * _this._w / _this._mx; },
    this._y0 = function(d) { return _this._h - d.y0 * _this._h / _this._my; },
    this._y1 = function(d) { return _this._h - (d.y + d.y0) * _this._h / _this._my; },
    this._y2 = function(d) { return d.y * _this.h / _this.mz; } // or `my` to not rescale

    // function transitionGroup() {
    //   var group = d3.selectAll("#chart");

    //   group.select("#group")
    //       .attr("class", "first active");

    //   group.select("#stack")
    //       .attr("class", "last");

    //   group.selectAll("g.layer rect")
    //     .transition()
    //       .duration(500)
    //       .delay(function(d, i) { return (i % m) * 10; })
    //       .attr("x", function(d, i) { return x({x: .9 * ~~(i / m) / n}); })
    //       .attr("width", x({x: .9 / n}))
    //       .each("end", transitionEnd);

    //   function transitionEnd() {
    //     d3.select(this)
    //       .transition()
    //         .duration(500)
    //         .attr("y", function(d) { return h - y2(d); })
    //         .attr("height", y2);
    //   }
    // }

    // function transitionStack() {
    //   var stack = d3.select("#chart");

    //   stack.select("#group")
    //       .attr("class", "first");

    //   stack.select("#stack")
    //       .attr("class", "last active");

    //   stack.selectAll("g.layer rect")
    //     .transition()
    //       .duration(500)
    //       .delay(function(d, i) { return (i % m) * 10; })
    //       .attr("y", y1)
    //       .attr("height", function(d) { return y0(d) - y1(d); })
    //       .each("end", transitionEnd);

    //   function transitionEnd() {
    //     d3.select(this)
    //       .transition()
    //         .duration(500)
    //         .attr("x", 0)
    //         .attr("width", x({x: .9}));
    //   }
    // }

    this.init();
  }

  Plugin.prototype.init = function () {
    var vis = d3.select("#chart")
      .append("svg:svg")
        .attr("width", this._w)
        .attr("height", this._h + this._p);

    var layers = vis.selectAll("g.layer")
      .data(this._data)
      .enter().append("svg:g")
      .style("fill", function(d, i) { return _this._color(i / (_this._n - 1)); })
      .attr("class", "layer");

    var bars = layers.selectAll("g.bar")
      .data(function(d) { return d; })
      .enter().append("svg:g")
        .attr("class", "bar")
        .attr("transform", function(d) { return "translate(" + _this._x(d) + ",0)"; });

    bars.append("svg:rect")
      .attr("width", this._x({x: .9}))
      .attr("x", 0)
      .attr("y", this._h)
      .attr("height", 0)
      .transition()
        .delay(function(d, i) { return i * 10; })
        .attr("y", _this._y1)
        .attr("height", function(d) { return _this._y0(d) - _this._y1(d); });

    var labels = vis.selectAll("text.label")
        .data(this._data[0])
        .enter().append("svg:text")
        .attr("class", "label")
        .attr("x", this._x)
        .attr("y", this._h + 6)
        .attr("dx", this._x({x: .45}))
        .attr("dy", ".71em")
        .attr("text-anchor", "middle")
        .text(function(d, i) { return d.name; });

    vis.append("svg:line")
        .attr("x1", 0)
        .attr("x2", this._w - this._x({x: .1}))
        .attr("y1", this._h)
        .attr("y2", this._h);
  };

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName,
                new Plugin( this, options ));
            }
        });
    }

})( jQuery, window, document );

;(function($) {})(jQuery);

/* Inspired by Lee Byron's test data generator. */
function stream_layers(n, m, o) {
  if (arguments.length < 3) o = 0;
  function bump(a) {
    var x = 1 / (.1 + Math.random()),
        y = 2 * Math.random() - .5,
        z = 10 / (.1 + Math.random());
    for (var i = 0; i < m; i++) {
      var w = (i / m - y) * z;
      a[i] += x * Math.exp(-w * w);
    }
  }
  return d3.range(n).map(function() {
      var a = [], i;
      for (i = 0; i < m; i++) a[i] = o + o * Math.random();
      for (i = 0; i < 5; i++) bump(a);
      return a.map(stream_index);
    });
}

/* Another layer generator using gamma distributions. */
function stream_waves(n, m) {
  return d3.range(n).map(function(i) {
    return d3.range(m).map(function(j) {
        var x = 20 * j / m - i / 3;
        return 2 * x * Math.exp(-.5 * x);
      }).map(stream_index);
    });
}

function stream_index(d, i) {
  return {x: i, y: Math.max(0, d)};
}