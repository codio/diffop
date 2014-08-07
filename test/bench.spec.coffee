evalOps = require('./helpers').evalOps
fs = require 'fs'

fetch = (name) -> JSON.parse fs.readFileSync "benchmark/fixtures/#{name}.json"

left200 = fetch 'left_200'
right200 = fetch 'right_200'
left14k = fetch 'left_14k'
right14k = fetch 'right_14k'


describe 'diffop - benchmark', ->
  it '200', ->
    evalOps left200, right200

  it '14k', ->
    evalOps left14k, right14k
