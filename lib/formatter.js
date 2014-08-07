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
    this.includeMoveDestinations = false;
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

    context.getPath = function () {
        return _.clone(this.path);
    };

    // Track the result

    context.ops = [];

    context.pushOp = function (op) {
        this.ops.push(op);
    };

};


// Entry and Leave Formatters
// --------------------------

OpsFormatter.prototype.rootBegin = function(context, type, nodeType) {

};

OpsFormatter.prototype.rootEnd = function(context, type, nodeType) {

};

OpsFormatter.prototype.nodeBegin = function(context, key, leftKey, type, nodeType) {
    context.push(leftKey);
};

OpsFormatter.prototype.nodeEnd = function(context, key, leftKey, type, nodeType, isLast) {
    context.pop();
};


// Individual Nodes Formatters
// ---------------------------


OpsFormatter.prototype.format_unchanged = function(context, delta, left) {
    return;
};

OpsFormatter.prototype.format_movedestination = function(context, delta, left) {
    return;
};

OpsFormatter.prototype.format_node = function(context, delta, left, key) {
    // recurse
    this.formatDeltaChildren(context, delta, left);
};

OpsFormatter.prototype.format_added = function(context, delta, left, key, leftKey, movedFrom) {

    context.pushOp({
        p: context.getPath(),
        oi: delta[0]
    });
};

OpsFormatter.prototype.format_modified = function(context, delta, left, key, leftKey, movedFrom) {

};

OpsFormatter.prototype.format_deleted = function(context, delta, left, key, leftKey, movedFrom) {

    context.pushOp({
        p: context.getPath(),
        od: delta[0]
    });
};

OpsFormatter.prototype.format_moved = function(context, delta) {
    return;
};

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
