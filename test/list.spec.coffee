evalOps = require('./helpers').evalOps

describe 'diffop - list', ->
  it 'create', ->

    first = {}
    second =
      test:
        [{file: 1}, {folder: {}}]

    evalOps first, second

  it 'delete', ->

    first =
      a : 1
      test:
        [{file: 1}, {folder: {}}]

    second = a: 1

    evalOps first, second


  it 'add', ->
    first = list: []

    second = list: [{file: 1}, {folder: {}}]

    evalOps first, second

  it 'remove', ->

    first =
      list: [{file: 1}, {folder: {}}]

    second =
      list: [{file: 1}]

    evalOps first, second


  it 'add middle', ->

    first =
      list: [{file: 1}, {folder: {}}]

    second =
      list: [{file: 1}, {some: {}}, {folder: {}}]

    evalOps first, second
