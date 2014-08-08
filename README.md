# DiffOp

[![Build Status](https://travis-ci.org/codio/diffop.svg?branch=master)](https://travis-ci.org/codio/diffop)

> Transform json diffs into ShareJS operations


## Installation

```bash
$ npm install --save diffop
```

## Usage

```js
var diffop = require('diffop');
var json = require('ottypes').json0;

// Some document controlled through non ShareJS methods.
var myDoc = /*...*/;

// ShareJS JSON0 document.
var shareDoc = /*...*/;

// Generate all needed operations to bring shareDoc up to date
// with the content of myDoc.
var ops = diffop(shareDoc, myDoc);

// Apply the operations to shareDoc
shareDoc = json.apply(shareDoc, ops);
```


## Development


Run tests

```bash
$ npm test
```


Run benchmarks

```bash
$ npm run bench
```


## Benchmarks

```bash
$ npm run bench

> node benchmark/base.js

jsondiffpatch: 200 x 110 ops/..........92% (82 runs sampled)
diffop: 200 x 104 ops/...........55% (78 runs sampled)
jsondiffpatch: 14k x 55,112 ops/..............28% (90 runs sampled)
diffop: 14k x 34,412 ops/...............16% (79 runs sampled)


jsondiffpatch: 200
--------
  Mean: 0.009093195406504063
  Variance: 1.5043349348547733e-7
--------


diffop: 200
--------
  Mean: 0.009614644143162397
  Variance: 4.531763311139242e-7
--------


jsondiffpatch: 14k
--------
  Mean: 0.000018145000320269585
  Variance: 1.4109974462443818e-11
--------


diffop: 14k
--------
  Mean: 0.00002905976249665717
  Variance: 4.628665265571148e-11
 --------
Finished
```
