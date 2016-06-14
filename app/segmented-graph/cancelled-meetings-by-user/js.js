/*!
 * jQuery lightweight plugin boilerplate
 * Original author: @ajpiano
 * Further changes, comments: @addyosmani
 * Licensed under the MIT license
 */

;(function ( $, window, document, undefined ) {
  var rawData = {
    data: [
      [
        {x: 0, y: 1, name:'a' },
        {x: 0, y: 2 }
      ],
      [
        {x: 0, y: 2, name:'chad' },
        {x: 0, y: 4, name:'chad' },
      ],
    ]
  }

  $('#chart').d3SegmentedChart({data:rawData.data});
})( jQuery, window, document );
