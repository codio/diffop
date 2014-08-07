evalOps = require('./helpers').evalOps

describe 'diffop - string', ->
  it 'rename (rewrite)', ->

    first = test: 'file'
    second = test: 'new_stuff'

    evalOps first, second

  it 'rename (partial add)', ->

    first = test: 'file'
    second = test: 'new_file'

    evalOps first, second

  it 'rename (partial delete)', ->

    first = test: 'old_file'
    second = test: 'file'

    evalOps first, second

  it 'rename (partial delete middle)', ->

    first = test: 'old_file'
    second = test: 'ol_file'

    evalOps first, second
