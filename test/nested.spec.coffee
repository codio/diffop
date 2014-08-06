diffop = require '../'
expect = require('chai').expect


describe 'diffop - nested', ->
  it 'insert', ->

    first =
      a: {}
      b: {}
    second =
      a: test: { some_folder: { some_file: 1 } }
      b: {}

    expected = [
      p: ['a']
      oi: test: { some_folder: some_file: 1 }
    ]

    expect(diffop first, second).to.be.deep.equal expected

  it 'delete', ->

    first =
      a: test: { some_folder: { some_file: 1 } }
      b: {}
    second =
      a: {}
      b: {}

    expected = [
      p: ['a']
      od: test: { some_folder: some_file: 1 }
    ]

    expect(diffop first, second).to.be.deep.equal expected
