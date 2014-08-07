diffop = require '../'
expect = require('chai').expect
json = require('ottypes').json0

log = (val) -> console.log JSON.stringify(val, null, 2)

exports.evalOps = (left, right, debug=no) ->
  ops = diffop left, right, debug

  if debug
    log left
    log right
    log ops

  applied = json.apply left, ops
  #appliedInc = json.incrementalApply left, ops, (->), (->)

  if debug

    console.log applied

  expect(applied).to.be.deep.equal right
  #expect(appliedInc).to.be.deep.equal right
