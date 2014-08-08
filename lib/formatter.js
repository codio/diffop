// Ops Formatter
// =============
//
// JSON Diff Patch compatible formatter, that formats a diff into
// the equivalent ShareJS JSON operations.
//
// Modeled after https://github.com/benjamine/jsondiffpatch/blob/master/src/formatters/console.js



// Dependencies
// ------------

var _ = require('lodash');
var base = require('jsondiffpatch/src/formatters/base');
var BaseFormatter = base.BaseFormatter;


// Formatter Instance
var OpsFormatter = function OpsFormatter() {
    this.includeMoveDestinations = true;
};

// Inherit from the BaseFormatter.
OpsFormatter.prototype = new BaseFormatter();


// Preparte the context, called before the traversing begins.
// The context is available at any step of the travers and
// is the way to store the current state.
//
// context - Object
OpsFormatter.prototype.prepareContext = function(context) {
    BaseFormatter.prototype.prepareContext.call(this, context);

    // Track the current path from the root as an array.

    context.path = [];

    // Push one level to the path.
    //
    // level - String
    context.push = function (level) {
        this.path.push(level);
    };

    // Pop one level from the path
    context.pop = function () {
        this.path.pop();
    };

    // Get a copy of the current path
    //
    // Returns an array.
    context.getPath = function () {
        return _.clone(this.path);
    };

    // Track the result

    context.ops = [];

    // Add an operation to the ops list.
    //
    // op - Object.
    context.pushOp = function (op) {
        this.ops.push(op);
    };

    // Track if the current node is an array.
    context.isArray = false;
};


// Entry and Leave Formatters
// --------------------------

// Root Begin
OpsFormatter.prototype.rootBegin = function(context, type, nodeType) {};

// Root Enter
OpsFormatter.prototype.rootEnd = function(context, type, nodeType) {};


// Node Begin
//
// context  - Object, current state.
// key      - String.
// leftKey  - String, can be undefined.
// type     - String.
// nodeType - String, one of 'array', 'object' or ''.
OpsFormatter.prototype.nodeBegin = function(context, key, leftKey, type, nodeType) {
    context.push(leftKey);

    if (nodeType === 'array') {
        context.isArray = true;
    }
};

// Node End
//
// context  - Object, current state.
// key      - String.
// leftKey  - String, can be undefined.
// type     - String.
// nodeType - String, one of 'array', 'object' or ''.
// isLast   - Boolean.
OpsFormatter.prototype.nodeEnd = function(context, key, leftKey, type, nodeType, isLast) {
    context.pop();

    if (nodeType === 'array') {
        context.isArray = false;
    }
};


// Individual Nodes Formatters
// ---------------------------


// Handle unchanged nodes
OpsFormatter.prototype.format_unchanged = function(context, delta, left) {};

// Handle move destinations
OpsFormatter.prototype.format_movedestination = function(context, delta, left) {};

// Handle nodes
OpsFormatter.prototype.format_node = function(context, delta, left, key) {
    // recurse
    this.formatDeltaChildren(context, delta, left);
};

// Handle added properties.
OpsFormatter.prototype.format_added = function(context, delta, left, key, leftKey, movedFrom) {

    var insert = delta[0];
    var op = {
        p: context.getPath()
    };
    if (context.isArray) {
        op.li = insert;
    } else {
        op.oi = insert;
    }

    context.pushOp(op);
};

// Handle modified nodes
OpsFormatter.prototype.format_modified = function(context, delta, left, key, leftKey, movedFrom) {};

// Handle removed nodes
OpsFormatter.prototype.format_deleted = function(context, delta, left, key, leftKey, movedFrom) {
    var insert = delta[0];
    var op = {
        p: context.getPath()
    };

    if (context.isArray) {
        op.ld = insert;
    } else {
        op.od = insert;
    }

    context.pushOp(op);
};

// Handle moved nodes
OpsFormatter.prototype.format_moved = function(context, delta) {};

// Handle text diffs
OpsFormatter.prototype.format_textdiff = function(context, delta) {
    var lines = this.parseTextDiff(delta[0]);

    _.forEach(lines, function (line) {
        var cursor = line.location.line - 1;

        _.forEach(line.pieces, function (piece) {

            switch(piece.type) {
            case 'deleted':
                context.pushOp({
                    p: context.getPath().concat([cursor]),
                    sd: piece.text
                });
                break;
            case 'added':
                context.pushOp({
                    p: context.getPath().concat([cursor]),
                    si: piece.text
                });
                cursor += piece.text.length;
                break;
            case 'context':
                cursor += piece.text.length;
                break;
            default:
                throw new Error('Unkown textdiff format');
            }
        });
    });
};


// Finalize
OpsFormatter.prototype.finalize = function (context) {
    return context.ops;
};


// Export
// ------

exports.OpsFormatter = OpsFormatter;

var defaultInstance;

var format = function(delta, left) {
    if (!defaultInstance) {
        defaultInstance = new OpsFormatter();
    }
    return defaultInstance.format(delta, left);
};

exports.format = format;
