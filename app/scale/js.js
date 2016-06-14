var linearScale = d3.scale.linear()
                           .domain([0,10000])
                           .range([0,100])

console.log(linearScale(1));
console.log(linearScale(10));
console.log(linearScale(100));


/*******************************************************************************
Manually setting Domain
*******************************************************************************/
var initialScaleData = [0, 1000, 3000, 2000, 5000, 4000, 7000, 6000, 9000, 8000, 10000];

var newScaledData = [];

var linearScale = d3.scale.linear()
                   .domain([0,10000])
                   .range([0,100]);

for (var i = 0; i < initialScaleData.length; i++) {
 newScaledData[i] = linearScale(initialScaleData[i]);
}

console.log(newScaledData);

/*******************************************************************************
Max and Min
*******************************************************************************/

var initialScaleData = [0, 1000, 3000, 2000, 5000, 4000, 7000, 6000, 9000, 8000, 10000];
var maxInitialData = d3.max(initialScaleData);
var minInitialData = d3.min(initialScaleData);

console.log('max: ', maxInitialData);
console.log('min: ', minInitialData);


/*******************************************************************************
Set Dynamically domain
*******************************************************************************/
var initialScaleData = [0, 1000, 3000, 2000, 5000, 4000, 7000, 6000, 9000, 8000, 10000];
var newScaledData = [];
var linearScale = d3.scale.linear()
                   .domain([d3.min(initialScaleData), d3.max(initialScaleData)])
                   .range([0,100]);

for (var i = 0; i < initialScaleData.length; i++) {
 newScaledData[i] = linearScale(initialScaleData[i]);
}

console.log(newScaledData);


