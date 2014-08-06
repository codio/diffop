// DiffOp
// ======

// Dependencies
// ------------

var jsondiff = require('jsondiffpatch').create();
var formatter = require('./lib/formatter');



// diffop
//
// first   - Object
// second  - Object
//
// Returns an Array containing json0 operations.
// For more info see https://github.com/ottypes/json0.
function diffop(first, second) {

    var diff = jsondiff.diff(first, second);

    return formatter.format(diff);
}


module.exports = diffop;
