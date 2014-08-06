
// Dependencies
// ------------

var Benchmark = require('benchmark');
var suite = new Benchmark.Suite();

var diffop = require('../');

var jsondiffpatch = require('jsondiffpatch');

var fs = require('fs');

// Files
// -----

var fileLeft200 = 'benchmark/fixtures/left_200.json';
var fileRight200 = 'benchmark/fixtures/right_200.json';

var left200 = JSON.parse(fs.readFileSync(fileLeft200));
var right200 = JSON.parse(fs.readFileSync(fileRight200));

var fileLeft14k = 'benchmark/fixtures/left_14k.json';
var fileRight14k = 'benchmark/fixtures/right_14k.json';

var left14k = JSON.parse(fs.readFileSync(fileLeft14k));
var right14k = JSON.parse(fs.readFileSync(fileRight14k));


var total = [];

suite
.add('jsondiffpatch: 200', function () {
    total.push(jsondiffpatch.diff(left200, right200));
})
.add('diffop: 200', function () {
    total.push(diffop(left200, right200));
})
.add('jsondiffpatch: 14k', function () {
    total.push(jsondiffpatch.diff(left14k, right14k));
})
.add('diffop: 14k', function () {
    total.push(diffop(left14k, right14k));
})
.on('cycle', function (event) {
    total = [];
    console.log(String(event.target));
})
.on('complete', function () {
    this.forEach(function (run) {
        console.log('\n\n%s', run.name);
        console.log('--------');
        console.log('  Mean: %s', run.stats.mean);
        console.log('  Variance: %s', run.stats.variance);
        console.log('--------');
    });

    console.log('Finished');
})
.run({async: true});
