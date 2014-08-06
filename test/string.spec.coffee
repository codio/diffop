diffop = require '../'
expect = require('chai').expect


describe 'diffop - string', ->
  it 'rename (rewrite)', ->

    first = test: 'file'
    second = test: 'new_stuff'

    expected = [
      p: ['test', 0]
      sd: 'file'
    ,
      p: ['test', 0]
      si: 'new_stuff'
    ]

    expect(diffop first, second).to.be.deep.equal expected

  it 'rename (partial add)', ->

    first = test: 'file'
    second = test: 'new_file'

    expected = [
      p: ['test', 0]
      si: 'new_'
    ]

    expect(diffop first, second).to.be.deep.equal expected

  it 'rename (partial delete)', ->

    first = test: 'old_file'
    second = test: 'file'

    expected = [
      p: ['test', 0]
      sd: 'old_'
    ]

    expect(diffop first, second).to.be.deep.equal expected

  it 'rename (partial delete middle)', ->

    first = test: 'old_file'
    second = test: 'ol_file'

    expected = [
      p: ['test', 2]
      sd: 'd'
    ]

    expect(diffop first, second).to.be.deep.equal expected
