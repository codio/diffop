evalOps = require('./helpers').evalOps

describe 'diffop - multiple', ->
  it 'insert', ->

    first =
      a: {}
      b: {}
    second =
      a: test: { some_folder: { some_file: 1 } }
      b: more: 1

    evalOps first, second

  it 'delete', ->

    first =
      a: test: { some_folder: { some_file: 1 } }
      b: more: 1
    second =
      a: {}
      b: {}

    evalOps first, second
