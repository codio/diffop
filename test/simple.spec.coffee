diffop = require '../'
expect = require('chai').expect


describe 'diffop - simpel', ->
  it 'insert', ->

    first = {}
    second = test: { some_folder: { some_file: 1 } }

    expected = [
      p: []
      oi: { test: { some_folder: some_file: 1 } }
    ]

    expect(diffop first, second).to.be.deep.equal expected

  it 'delete', ->

    first = test: { some_folder: { some_file: 1 } }
    second = {}

    expected = [
      p: []
      od: { test: { some_folder: some_file: 1 } }
    ]

    expect(diffop first, second).to.be.deep.equal expected

  it 'move', ->

    first = test: { some_folder: { some_file: 1 } }
    second = bin: { some_folder: { some_file: 1 } }

    expected = [
      p: []
      oi: { bin: { some_folder: some_file: 1 } }
    ,
      p: []
      od: { test: { some_folder: some_file: 1 } }
    ]

    expect(diffop first, second).to.be.deep.equal expected
