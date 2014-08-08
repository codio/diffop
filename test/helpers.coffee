diffop = require '../'
expect = require('chai').expect
json = require('ottypes').json0

log = (val) -> console.log JSON.stringify(val, null, 2)

exports.evalOps = (left, right, debug=no) ->
  ops = diffop left, right, debug

  if debug
    log 'Debug:\n'
    log left
    log right
    log ops

  applied = json.apply left, ops

  log applied if debug

  expect(applied).to.be.deep.equal right
