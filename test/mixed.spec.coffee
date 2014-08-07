evalOps = require('./helpers').evalOps

describe 'diffop - mixed', ->
  it '1', ->

    first =
      a: more: 1
      b: {}
    second =
      a: test: { some_folder: { some_file: 1 } }
      b: more: 1

    evalOps first, second
