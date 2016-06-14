const mergeTrees  = require('broccoli-merge-trees');
const browserify = require('broccoli-browserify');
const esTranspiler = require('broccoli-babel-transpiler');
const Funnel = require('broccoli-funnel');
const Concat = require('broccoli-concat');
const MergeTrees = require('broccoli-merge-trees');
const pkg = require('./package.json');

const projectDir = './';

// source trees are node versions of files
var sourceTrees = [];


/****************************************
* html
****************************************/
var htmlDir = projectDir + 'app';

var html = Funnel(htmlDir, {
 include: [ '**/*.html' ]
});

sourceTrees.push(html);

/****************************************
* Styles
****************************************/
var stylesDir = projectDir + 'app/css';

var styles = Funnel(stylesDir, {
  include: [ '*' ]
});

styles = Concat(styles, {
  inputFiles: ['**/*'],
  outputFile: 'styles.css'
});

sourceTrees.push(styles);

/****************************************
* node_modules libs inport
****************************************/
var nodeModulesDir = projectDir + 'node_modules/';

var jsLibs = Funnel(nodeModulesDir, {
  files: [
    'd3/d3.js',
    'jquery/dist/jquery.js',
    'moment/moment.js'
  ],
  getDestinationPath: function(relativePath) {
    if(relativePath === 'd3/d3.js'){
      return 'js/d3.js';
    } else if (relativePath === 'jquery/dist/jquery.js'){
      return '/js/jquery.js';
    } else if (relativePath === 'moment/moment.js') {
      return '/js/moment.js';
    }  else {
      return '/js/' + relativePath;
    }


  }
})

sourceTrees.push(jsLibs);


/****************************************
* Javascript
****************************************/
var jsDir = projectDir + 'app';

var js = Funnel(jsDir, {
  include: ['**/*.js']
});

// js = esTranspiler(js, {
//   filterExtensions:['js', 'es6'],
//   browserPolyfill: true,
// });

// js = browserify(js, {
//   outputFile: 'js.js'
// });


//  js = Concat(js, {
//   inputFiles: ['*'],
//   outputFile: 'js.js'
// });



sourceTrees.push(js);



module.exports = new MergeTrees(sourceTrees);
