/*******************************************************************************
* @method generateRectangles
* @param {Number} svg group selector
* @params [{Object}] collection of Rectanble Data Objects
*******************************************************************************/
function generateRectangles(count){
  var colors = ['red', 'blue', 'green', 'yellow', 'purple', 'cyan'];
  return _.times(count, function(idx){
    return {
      width: 30,
      height: 30,
      "rx": (idx * 15),
      "ry": (idx * 15),
      color: _.sample(colors)
    };
  });
}

/*******************************************************************************
* @method generateCircles
* @param {Number} number of items to create
* @params [{Object}] collection Circle Data Objects
*******************************************************************************/
function generateCircles(count){
  var colors = ['red', 'blue', 'green', 'yellow', 'purple', 'cyan'];
  return _.times(count, function(idx){
    return {
      cx: 100+(idx * 50),
      cy: 20,
      radius: _.random(1,10) * 2,
      color: _.sample(colors)
    };
  });
}

/*******************************************************************************
* Data Collections
*******************************************************************************/
var rectanglesData = generateRectangles(15);
var circlesData = generateCircles(10);

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
* rectangles
*******************************************************************************/
var rectangleGroup = container.append("g")
  .attr("transform", "translate(80,0)");

var rectangles = rectangleGroup.selectAll("rect")
  .data(rectanglesData)
  .enter()
  .append("rect");

var rectangleAttributes = rectangles
  .attr("x", function (d) { return d.rx; })
  .attr("y", function (d) { return d.ry; })
  .attr("height", function (d) { return d.height; })
  .attr("width", function (d) { return d.width; })
  .style("fill", function(d) { return d.color; });

/*******************************************************************************
* circles
*******************************************************************************/
var circlesGroup = container.append("g")
  .attr("transform", "translate(80,0)");;
var circles = circlesGroup.selectAll("circle")
  .data(circlesData)
  .enter()
  .append("circle");

var circleAttributes = circles
  .attr("r", function(d){ return d.radius; })
  .attr("cx", function (d) { return d.cx; })
  .attr("cy", function (d) { return d.cy; })
  .style("fill", function(d) { return d.color; });