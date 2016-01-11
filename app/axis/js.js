var h=100;
var w=400;
var padding = 30;


function getDate(d){

    //20130101
    var strDate = new String(d);

    var year = strDate.substr(0,4);
    var month = strDate.substr(4,2)-1; //zero based index
    var day = strDate.substr(6,2);

    return new Date(year, month, day);
}

//build line
function buildLine(ds) {

  // console.log('xscale-max: '+ d3.max(ds.monthlySales, function (d){ return d.month; }));
  // console.log('yscale-max: '+ d3.max(ds.monthlySales, function (d){ return d.sales; }));

  var minDate = getDate(ds.monthlySales[0]['month']);
  var maxDate = getDate(ds.monthlySales[ds.monthlySales.length-1]['month']);

  console.log("min: " +minDate);
  console.log("max: " +maxDate);

  //scales
  var xScale = d3.time.scale()
    .domain([minDate, maxDate])
    .range([padding+5, w-padding]);


  var yScale = d3.scale.linear()
    .domain([0, d3.max(ds.monthlySales, function(d){ return d.sales;})])
    .range([h-padding,10]);

  var xAxisGen = d3.svg.axis().scale(xScale).orient("bottom").tickFormat(d3.time.format("%b"));
  var yAxisGen = d3.svg.axis().scale(yScale).orient("left").ticks(4);

  var lineFun = d3.svg.line()
    .x(function (d) {return xScale(getDate(d.month)); } )
    .y(function (d) {return yScale(d.sales); })
    .interpolate("linear");

  var svg = d3.select("body").append("svg").attr({ width:w, height:h});

  var yAxis = svg.append("g").call(yAxisGen)
    .attr("class", "axis")
    .attr("transform", "translate(" + padding + ", 0)");

  var xAxis = svg.append("g").call(xAxisGen)
    .attr("class","axis")
    .attr("transform", "translate(0," + (h-padding) + ")");

  var viz = svg.append("path")
    .attr({
        d: lineFun(ds.monthlySales),
        "stroke" : "purple",
        "stroke-width": 2,
        "fill" : "none"
    });

}

//show header
function showHeader(ds) {
    d3.select("body").append("h1")
        .text(ds.category + " Sales (2013)");
}


//get data and draw things
d3.json("https://api.github.com/repos/bsullins/d3js-resources/contents/monthlySalesbyCategoryMultiple.json", function(error, data) {

   if(error) {
       console.log(error);
   } else {
       console.log(data); //we're golden!
   }

    var decodedData = JSON.parse(window.atob(data.content));

    console.log(decodedData.contents);


    decodedData.contents.forEach(function(content){
        ds=content;
        console.log(ds);
        showHeader(ds);
        buildLine(ds);
    })

});