evalOps = require('./helpers').evalOps

describe 'diffop - bugfixes', ->
  it 'decode special characters (codio-4312)', ->

    first = description: "HARTL tutorial, JSL, CodeSchool's SoupToBits, codecademy Ruby APIs"
    second = description: "codecademy Ruby APIs\nRailsapps"

    evalOps first, second
