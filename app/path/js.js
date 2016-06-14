/*******************************************************************************
* Data
*******************************************************************************/
var lineData = [ { "x": 1,   "y": 5},  { "x": 20,  "y": 20},
                  { "x": 40,  "y": 10}, { "x": 60,  "y": 40},
                  { "x": 80,  "y": 5},  { "x": 100, "y": 60}];

/*******************************************************************************
* Svg Container
*******************************************************************************/
var fullWidth = document.getElementById('graph').offsetWidth;
var graphPadding = 80;
var width = (fullWidth-graphPadding);
var fullHeight = 380;
var height = (fullHeight-30);

var container = d3.select("#graph").append("svg")
  .attr("width", 600)
  .attr("height", 600);


/*******************************************************************************
* line Path
*******************************************************************************/

var lineFunction = d3.svg.line()
  .x(function(d) { return d.x; })
  .y(function(d) { return d.y; })
  .interpolate("basis");


/*******************************************************************************
* Line Style
*******************************************************************************/
var lineGraph = container.append("path")
  .attr("d", lineFunction(lineData))
  .attr("stroke", "blue")
  .attr("stroke-width", 2)
  .attr("fill", "none");