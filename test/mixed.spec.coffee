diffop = require '../'
expect = require('chai').expect


describe 'diffop - mixed', ->
  it '1', ->

    first =
      a: more: 1
      b: {}
    second =
      a: test: { some_folder: { some_file: 1 } }
      b: more: 1

    expected = [
      p: ['a']
      od: more: 1
    ,
      p: ['a']
      oi: test: { some_folder: some_file: 1 }
    ,
      p: ['b']
      oi: more: 1
    ]

    expect(diffop first, second).to.be.deep.equal expected
