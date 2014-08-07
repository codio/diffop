// DiffOp
// ======

// Dependencies
// ------------

var jsondiff = require('jsondiffpatch').create({
    objectHash: objectHash,
    textDiff: {
        minLength: 1
    }
});

var formatter = require('./lib/formatter');



// diffop
//
// first   - Object
// second  - Object
// debug   - Boolean, optional.
//
// Returns an Array containing json0 operations.
// For more info see https://github.com/ottypes/json0.
function diffop(first, second, debug) {

    var diff = jsondiff.diff(first, second);

    if (debug) {
        console.log(JSON.stringify(diff, null, 2));
    }
    return formatter.format(diff);
}


function objectHash(obj) {
    return JSON.stringify(obj);
}

module.exports = diffop;
