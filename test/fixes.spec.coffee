evalOps = require('./helpers').evalOps
diffop = require '../'
expect = require('chai').expect
json = require('ottypes').json0

describe 'diffop - bugfixes', ->
  it 'decode special characters (codio-4312)', ->

    first = description: "HARTL tutorial, JSL, CodeSchool's SoupToBits, codecademy Ruby APIs"
    second = description: "codecademy Ruby APIs\nRailsapps"

    evalOps first, second


describe 'diffop - bugfixes', ->
  it 'decode special characters to correct position (codio-4782)', ->

    first = description: "Dart\nAngularJS (angulardart)\nPolymer (polymer-generator)\nYeoman (yo, bower, grunt)\nDiveshot (for deploying...)\n\nAddeOther:\ntmux (great for resuming terminal sessions)\nd manual save; Cause of grunt. (temporarely disabled)"
    second = description: "Dart\nAngularJS (angulardart)\nPolymer (polymer-generator)\nYeoman (yo, bower, grunt)\nDiveshot (for deploying...)\n\nOther:\ntmux (great for resuming terminal sessions)\nAdded manual save; Cause of grunt. (temporarely disabled)"

    ops = diffop first, second
    applied = json.apply first, ops

    expect(ops[0].p).to.be.deep.equal ["description", 112]
    expect(ops[1].p).to.be.deep.equal ["description", 163]
    expect(applied).to.be.deep.equal second
