var assert = require('assert');
var fs = require('fs');
var Buffer = require('buffer').Buffer;

var sys = require('util');

var compiler = require('../src/compiler.js');

var code = fs.readFileSync(__dirname + '/../static/example/movingsprite/scrolling5.asm', 'utf8');

var bin = fs.readFileSync(__dirname + '/../fixtures/scrolling/scrolling5.nes', 'binary');

exports.test_get_labels = function(test){
    var tokens = compiler.lexical(code);
    var ast = compiler.syntax(tokens);
    var labels = compiler.get_labels(ast);
    test.equal(0xe000, labels.palette, 'invalid pallete');
    test.equal(0xe000 + 32, labels.sprites);
    test.equal(0xe030, labels.columnData);
    test.equal(0xf030, labels.attribData);
    test.done();
};

exports.test_asm_compiler = function(test){
    compiler.path = '/../static/example/movingsprite/';
    var tokens = compiler.lexical(code);
    var ast = compiler.syntax(tokens);
    var opcodes = compiler.semantic(ast, true);
    /*
    fs.open(__dirname + '/../fixtures/scrolling/test_scrolling.nes', 'w', function(status, fd) {
        var buffer = new Buffer(opcodes);
        fs.writeSync(fd, buffer, 0, opcodes.length, 0);
    });
    */
    var data = String.fromCharCode.apply(undefined, opcodes);

    test.equal(bin, data);

    test.done();
};