const mergeTrees  = require('broccoli-merge-trees');
const browserify = require('broccoli-browserify');
const esTranspiler = require('broccoli-babel-transpiler');
const Funnel = require('broccoli-funnel');
const Concat = require('broccoli-concat');
const MergeTrees = require('broccoli-merge-trees');
const pkg = require('./package.json');

const projectDir = './';

//source trees are node versions of files
var sourceTrees = [];


/****************************************
* html
****************************************/
var htmlDir = projectDir + 'app';

var html = Funnel(htmlDir, {
  include: ['*.html']
});

// app = esTranspiler(app, {
//   filterExtensions:['js', 'es6'],
//   browserPolyfill: true,
// });

sourceTrees.push(html);

/****************************************
* Styles
****************************************/
var stylesDir = projectDir + 'app/css';

var styles = Funnel(stylesDir, {
  include: ['*']
});

styles = Concat(styles, {
  inputFiles: ['**/*'],
  outputFile: 'styles.css'
});

sourceTrees.push(styles);

/****************************************
* Javascript D#
****************************************/
var d3Dir = projectDir + 'node_modules/d3';

var d3 = Funnel(d3Dir, {
  include: ['d3.js']
});

sourceTrees.push(d3);
/****************************************
* Javascript
****************************************/
var jsDir = projectDir + 'app/js';

var js = Funnel(jsDir, {
  include: ['*']
});

// js = esTranspiler(js, {
//   filterExtensions:['js', 'es6'],
//   browserPolyfill: true,
// });

// js = browserify(js, {
//   outputFile: 'js.js'
// });


 js = Concat(js, {
  inputFiles: ['*'],
  outputFile: 'js.js'
});



sourceTrees.push(js);



module.exports = new MergeTrees(sourceTrees);
