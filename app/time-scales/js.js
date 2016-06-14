/*******************************************************************************
Manually setting Domain
*******************************************************************************/
var date1 = new Date(2010,0,01);
var date2 = new Date(2011,0,01)
var timeScale1 = d3.time.scale()
  .domain([date1, date2])
  .range([0,12]);
console.log(timeScale1(new Date(2010,06,01), 11))


