diffop = require '../'
expect = require('chai').expect


describe 'diffop - multiple', ->
  it 'insert', ->

    first =
      a: {}
      b: {}
    second =
      a: test: { some_folder: { some_file: 1 } }
      b: more: 1

    expected = [
      p: ['a']
      oi: test: { some_folder: some_file: 1 }
    ,
      p: ['b']
      oi: more: 1
    ]

    expect(diffop first, second).to.be.deep.equal expected

  it 'delete', ->

    first =
      a: test: { some_folder: { some_file: 1 } }
      b: more: 1
    second =
      a: {}
      b: {}

    expected = [
      p: ['a']
      od: test: { some_folder: some_file: 1 }
    ,
      p: ['b']
      od: more: 1
    ]

    expect(diffop first, second).to.be.deep.equal expected
