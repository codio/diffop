// DiffOp
// ======

// Dependencies
// ------------

var jsondiff = require('jsondiffpatch').create();
var _ = require('lodash');




// diffop
//
// first   - Object
// second  - Object
//
// Returns an Array containing json0 operations.
// For more info see https://github.com/ottypes/json0.
function diffop(first, second) {

    var diff = jsondiff.diff(first, second);

    var result = [];


    _.forEach(diff, function (localDiff, name) {

        if (_.isArray(localDiff)) {
            var od, oi;
            switch(localDiff.length) {
            case 1:
                // Add
                oi = {};
                oi[name] = localDiff[0];
                result.push({
                    p: [],
                    oi: oi
                });
                break;
            case 2:
                // Modified
                od = {};
                od[name] = localDiff[0];
                oi = {};
                oi[name] = localDiff[1];

                result.push({
                    p: [],
                    od: od,
                    oi: oi
                });
                break;
            case 3:
                // Delete
                od = {};
                od[name] = localDiff[0];
                result.push({
                    p: [],
                    od: od
                });
                break;
            default:
                throw new Error('Unkown diff format');
            }
            return;
        }

        // Inner Changes
        // need to recurse

    });

    return result;
}


module.exports = diffop;
