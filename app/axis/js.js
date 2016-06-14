/*******************************************************************************
Create Basic Axis
*******************************************************************************/
var data = [
  {x: 0,  y:10},
  {x: 10, y:20},
  {x: 20, y:30},
  {x: 30, y:30},
  {x: 40, y:40}
]
/*******************************************************************************
Container
*******************************************************************************/
var containerH = 400;
var containerW = 400;
var padding = 40;

var domainX = d3.extent(data, function(d){ return d.x; })
var domainY = d3.extent(data, function(d){ return d.y; })

var rangeSVGX = [0, 400]
var rangeSVGY = [0, 400]
var svgContainer = d3.select("#graph1").append("svg")
  .attr("width", containerH)
  .attr("height", containerW);

/*******************************************************************************
xAxis
*******************************************************************************/
//define scale
var xAxisScale = d3.scale.linear()
  .domain(domainX)
  .range(rangeSVGX);

//create
var xAxis = d3.svg.axis()
  .scale(xAxisScale);

//attach to container
var xAxisGroup = svgContainer.append("g")
  .attr("transform", "translate(0," + (containerH - padding) + ")")
  .call(xAxis);


/*******************************************************************************
yAxis
*******************************************************************************/
//define scale attributes
var yAxisScale = d3.scale.linear()
  .domain(domainY)
  .range(rangeSVGY);

//create
var yAxis = d3.svg.axis()
  .orient("left")
  .scale(yAxisScale)

//attache
var yAxisGroup = svgContainer.append("g")
  .attr("transform", "translate(" + padding + ",0)")
  .call(yAxis);

/*******************************************************************************
Graph2
1. define margin
2. define box
3. define inner box ( box - margin )
4. create container
  - translate container to inner box origin
5. xAxis
  - define xAsixScale
  - create xAxis
  - append svg `g` to container
  - call(xAxis) on new svg `g`
6. xAxis
  - define xAsixScale
    - flip domain to count/tick from bottom to top
  - create xAxis
  - append svg `g` to container
  - call(xAxis) on new svg `g`

*******************************************************************************/
var margin2 = {
  top:50,
  right: 50,
  bottom: 50,
  left:50
}

var width2 = 300 + margin2.left + margin2.right;
var height2 = 300 + margin2.top + margin2.bottom;
var width2inner = width2 - margin2.left - margin2.right;
var height2inner = height2 - margin2.top - margin2.bottom;

var domain2X = [0, width2]
var domain2Y = [width2, 0]

var range2SVGX = [0, 300];
var range2SVGY = [0, 300];

var container2 = d3.select('#graph2').append('svg')
  .attr("width", width2)
  .attr("height", height2)
  .append('g')
  .attr('transform', `translate(${margin2.left},${margin2.top})`);

var xAxisScale2 = d3.scale.linear()
  .domain(domain2X)
  .range(range2SVGX);

var xAxis2 = d3.svg.axis()
  .scale(xAxisScale2);

container2.append('g')
  .attr("transform", `translate(0, ${height2inner})`)
  .call(xAxis2);

var yAxisScale2 = d3.scale.linear()
  .domain(domain2Y)
  .range(range2SVGY)

var yAxis2 = d3.svg.axis()
  .orient('left')
  .scale(yAxisScale2);

container2.append('g')
  // .attr("tranform", `translate(0,${padding})`)
  .call(yAxis2)

/*******************************************************************************
Graph 3 - axis manipulations
*******************************************************************************/
var margin3 = {}

var c3 = function container(elementID, data) {
 var margin = {
    top: 50,
    right: 50,
    bottom: 50,
    left: 50,
  };

  var bWidth = 300;
  var bHeight = 300;

  var cWidth = bWidth + margin.left + margin.right;
  var cHeight =  bHeight + margin.top + margin.bottom;

  var innerWidth = cWidth - margin.left - margin.right;
  var innertHeight = cHeight - margin.top - margin.bottom;

  // var domainX = [0, 10];
  debugger;
  var domainX = d3.extent( data, function(d,i){ return d.x; });
  var domainY = d3.extent( data, function(d,i){ return d.y; });

  var rangeX = [0, bWidth];
  var rangeY = [0, bHeight];

  var container = d3.select(elementID+'').append('svg')
    .attr("width", cWidth)
    .attr("height", cHeight)

  var innerContainer = container.append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);

  var publicApi = {
    container: container,
    innerContainer: innerContainer,
    margin: margin,

    width: cWidth,
    height: cHeight,

    innerWidth: innerWidth,
    innertHeight: innertHeight,

    domainX: domainX,
    domainY: domainY,

    rangeX: rangeX,
    rangeY: rangeY
  }

  return publicApi;
};

var graph3Data = [
  {x:1, y:2},
  {x:2, y:8},
  {x:3, y:4}
];

var C3= c3("#graph3", graph3Data);
var container3 = C3.innerContainer;

var xAxisScale3 = d3.scale.linear()
  .domain(C3.domainX)
  .range(C3.rangeX);

var xAxis3 = d3.svg.axis()
  .orient('bottom')
  .scale(xAxisScale3);

container3.append('g')
  .attr("transform", `translate(0, ${C3.innerWidth})`)
  .call(xAxis3);

var yAxisScale3 = d3.scale.linear()
  .domain(C3.domainY)
  .range(C3.rangeY);

var yAxis3 = d3.svg.axis()
  .orient('left')
  .scale(yAxisScale3);

container3.append('g')
  .call(yAxis3)

var g3circle = container3
  .selectAll('circle')
  .data(graph3Data)
  .enter()
  .append('circle')

var g3CircleAttributes = g3circle
  .attr('cx', function(d,i){ return xAxisScale3(d.x); })
  .attr('cy', function(d,i){ return xAxisScale3(d.y); })
  .attr('r', function(d,i){ return 5; });


