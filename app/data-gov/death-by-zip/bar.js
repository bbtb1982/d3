function buildGraph(data){
  var w =  100;
  var h = 300;
  var svg = d3.select('body').append('svg').attr({ width: w, height: h});

}

var pData = new Promise(function(resolve, reject) {
   jQuery.get('https://cdph.data.ca.gov/api/views/ezms-cei8/rows.json', function(data){
    return resolve(data);
   });
});


pData.then(
  function(value){
    drawGraph(value);
    console.log(value);
  },
  function(reason){
    console.log(reason);
  }
);