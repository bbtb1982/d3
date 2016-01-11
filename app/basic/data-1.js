var width = 250;
var heigth = 50;
var padding = 2;
var dataset = [ 5, 10, 15, 20, 25 ];


var rect_width = 10;
var rect_heigth = 10;
var rect_padding = 2;

var canvas_width = function(itmes_count, rect_w, rect_padding ) { return ( itmes_count * (rect_w + rect_padding) ) };
var canvas_heigth = 5;

var svg = d3.select('body')
  .append('svg')
    .attr('width', canvas_width(dataset.length, rect_width, rect_padding ))
    .attr('height', canvas_heigth);

svg.selectAll('rect')
  .data(dataset)
  .enter()
  .append('rect')
    .attr('x', function (d, i) {return ( i * (width / dataset.length));})
    .attr('y', 0)
    .attr('width', 20)
    .attr('height', 20);
