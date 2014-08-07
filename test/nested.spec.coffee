evalOps = require('./helpers').evalOps

describe 'diffop - nested', ->
  it 'insert', ->

    first =
      a: {}
      b: {}
    second =
      a: test: { some_folder: { some_file: 1 } }
      b: {}

    evalOps first, second

  it 'delete', ->

    first =
      a: test: { some_folder: { some_file: 1 } }
      b: {}
    second =
      a: {}
      b: {}

    evalOps first, second

  it 'insert (multiple)', ->

    first =
      a: {}
    second =
      a:
        test:
          some_folder:
            some_file: 1
            some_other_file: 1
            dir: {}
        lib:
          content: {}

    evalOps first, second
