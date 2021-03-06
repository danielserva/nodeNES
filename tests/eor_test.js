var assert = require('assert');

var compiler = require('../lib/compiler.js');

exports.test_eor_imm = function(test){
    var tokens = compiler.lexical('EOR #10');
    test.equal(2 , tokens.length);
    test.equal('T_INSTRUCTION', tokens[0].type);
    test.equal('T_HEX_NUMBER', tokens[1].type);
    var ast = compiler.syntax(tokens);
    test.equal(1 , ast.length);
    test.equal('S_IMMEDIATE', ast[0].type);
    var code = compiler.semantic(ast);
    test.deepEqual(code, [0x49, 0x10]);
    test.done();
};

exports.test_eor_imm = function(test){
    var tokens = compiler.lexical('EOR $00');
    test.equal(2 , tokens.length);
    test.equal('T_INSTRUCTION', tokens[0].type);
    test.equal('T_ADDRESS', tokens[1].type);
    var ast = compiler.syntax(tokens);
    test.equal(1 , ast.length);
    test.equal('S_ZEROPAGE', ast[0].type);
    var code = compiler.semantic(ast);
    test.deepEqual(code, [0x45, 0x00]);
    test.done();
};

exports.test_eor_imm = function(test){
    var tokens = compiler.lexical('EOR $10,X');
    test.equal(4 , tokens.length);
    test.equal('T_INSTRUCTION', tokens[0].type);
    test.equal('T_ADDRESS', tokens[1].type);
    test.equal('T_SEPARATOR', tokens[2].type);
    test.equal('T_REGISTER', tokens[3].type);
    var ast = compiler.syntax(tokens);
    test.equal(1 , ast.length);
    test.equal('S_ZEROPAGE_X', ast[0].type);
    var code = compiler.semantic(ast);
    test.deepEqual(code, [0x55, 0x10]);
    test.done();
};

exports.test_eor_imm = function(test){
    var tokens = compiler.lexical('EOR $1234');
    test.equal(2 , tokens.length);
    test.equal('T_INSTRUCTION', tokens[0].type);
    test.equal('T_ADDRESS', tokens[1].type);
    test.equal('$1234', tokens[1].value);
    var ast = compiler.syntax(tokens);
    test.equal(1 , ast.length);
    test.equal('S_ABSOLUTE', ast[0].type);
    var code = compiler.semantic(ast);
    test.deepEqual(code, [0x4D, 0x34, 0x12]);
    test.done();
};

exports.test_eor_imm = function(test){
    var tokens = compiler.lexical('EOR $1234,X');
    test.equal(4 , tokens.length);
    test.equal('T_INSTRUCTION', tokens[0].type);
    test.equal('T_ADDRESS', tokens[1].type);
    test.equal('$1234', tokens[1].value);
    test.equal('T_SEPARATOR', tokens[2].type);
    test.equal('T_REGISTER', tokens[3].type);
    var ast = compiler.syntax(tokens);
    test.equal(1 , ast.length);
    test.equal('S_ABSOLUTE_X', ast[0].type);
    var code = compiler.semantic(ast);
    test.deepEqual(code, [0x5D, 0x34, 0x12]);
    test.done();
};

exports.test_eor_imm = function(test){
    var tokens = compiler.lexical('EOR $1234,Y');
    test.equal(4 , tokens.length);
    test.equal('T_INSTRUCTION', tokens[0].type);
    test.equal('T_ADDRESS', tokens[1].type);
    test.equal('T_SEPARATOR', tokens[2].type);
    test.equal('T_REGISTER', tokens[3].type);
    var ast = compiler.syntax(tokens);
    test.equal(1 , ast.length);
    test.equal('S_ABSOLUTE_Y', ast[0].type);
    var code = compiler.semantic(ast);
    test.deepEqual(code, [0x59, 0x34, 0x12]);
    test.done();
};

exports.test_eor_imm = function(test){
    var tokens = compiler.lexical('EOR ($20,X)');
    test.equal(6 , tokens.length);
    test.equal('T_INSTRUCTION', tokens[0].type);
    test.equal('T_OPEN', tokens[1].type);
    test.equal('T_ADDRESS', tokens[2].type);
    test.equal('$20', tokens[2].value);
    test.equal('T_SEPARATOR', tokens[3].type);
    test.equal('T_REGISTER', tokens[4].type);
    test.equal('T_CLOSE', tokens[5].type);
    var ast = compiler.syntax(tokens);
    test.equal(1 , ast.length);
    test.equal('S_INDIRECT_X', ast[0].type);
    var code = compiler.semantic(ast);
    test.deepEqual(code, [0x41, 0x20]);
    test.done();
};

exports.test_eor_imm = function(test){
    var tokens = compiler.lexical('EOR ($20),Y');
    test.equal(6 , tokens.length);
    test.equal('T_INSTRUCTION', tokens[0].type);
    test.equal('T_OPEN', tokens[1].type);
    test.equal('T_ADDRESS', tokens[2].type);
    test.equal('T_CLOSE', tokens[3].type);
    test.equal('T_SEPARATOR', tokens[4].type);
    test.equal('T_REGISTER', tokens[5].type);
    var ast = compiler.syntax(tokens);
    test.equal(1 , ast.length);
    test.equal('S_INDIRECT_Y', ast[0].type);
    var code = compiler.semantic(ast);
    test.deepEqual(code, [0x51, 0x20]);
    test.done();
};
