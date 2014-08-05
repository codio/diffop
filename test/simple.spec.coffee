diffop = require '../'
expect = require('chai').expect


describe 'diffop', ->
  it 'simple insert', ->

    first = {}
    second = test: { some_folder: { some_file: 1 } }

    expected = [
      p: []
      oi: { test: { some_folder: some_file: 1 } }
    ]

    expect(diffop first, second).to.be.deep.equal expected
