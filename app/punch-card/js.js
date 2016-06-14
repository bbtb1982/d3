/*******************************************************************************
* @method generateWeeks
* @return [{String}...]  array of numbers as string.
*******************************************************************************/
function generateWeeks(){
  return _.times(51, function(index){
    return index+1;
  });
}
/*******************************************************************************
* @method generateDays
* @return [{String}...]  array of day names as string.
*******************************************************************************/
function generateDays(){
  return [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
}

var fullWidth = document.getElementById('graph').offsetWidth;
var graphPadding = 80;
var width = (fullWidth-graphPadding);
var fullHeight = 380;
var height = (fullHeight-30);
var days = generateDays();
var weeks = generateWeeks();

var palette = d3.select("#graph").append("svg")
  .attr("width", fullWidth)
  .attr("height", fullHeight);

var dayGroup = palette.append("g");
var hourGroup = palette.append("g");
var circleGroup = palette.append("g");

$(document).ready(function(){

});