var h = 100;
var w = 666;
var padding = 20;


//build line
function buildLine(ds) {

    console.log('xscale-max: '+ d3.max(ds.monthlySales, function (d){ return d.month; }));
    console.log('yscale-max: '+ d3.max(ds.monthlySales, function (d){ return d.sales; }));

    //scales
    var xScale = d3.scale.linear()
                .domain([
                            d3.min(ds.monthlySales, function(d){ return d.month;}) ,
                            d3.max(ds.monthlySales, function(d){ return d.month;})
                        ])
                .range([0, w])
                .nice();


    var yScale = d3.scale.linear()
                .domain([0, d3.max(ds.monthlySales, function(d){ return d.sales;})])
                .range([h,0])
                .nice();

    var lineFun = d3.svg.line()
        .x(function (d) {return xScale(d.month); } )
        .y(function (d) {return yScale(d.sales); })
        .interpolate("linear");

    var svg = d3.select("body").append("svg").attr({ width:w, height:h});

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