diffop = require '../'
expect = require('chai').expect
json = require('ottypes').json0


exports.evalOps = (left, right) ->
  ops = diffop left, right
  applied = json.apply left, ops

  expect(applied).to.be.deep.equal right
