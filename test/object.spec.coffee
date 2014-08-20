evalOps = require('./helpers').evalOps

describe 'diffop - object', ->
  it 'modify (rewrite)', ->

    first = test: null
    second = test: 'new_stuff'

    evalOps first, second