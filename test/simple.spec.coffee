evalOps = require('./helpers').evalOps

describe 'diffop - simpel', ->
  it 'insert', ->

    first = {}
    second = test: { some_folder: { some_file: 1 } }

    evalOps first, second

  it 'delete', ->

    first = test: { some_folder: { some_file: 1 } }
    second = {}

    evalOps first, second

  it 'move', ->

    first = test: { some_folder: { some_file: 1 } }
    second = bin: { some_folder: { some_file: 1 } }

    evalOps first, second
