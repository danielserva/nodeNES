var assert = require('assert');

var compiler = require('../lib/compiler.js');

exports.test_invalid_token = function(test){
    try {
        var tokens = compiler.lexical("!test");
        test.ok(false);
    } catch (e){
        test.equal(1, e.erros.length);
    }
    test.done();
};

exports.test_invalid_token = function(test){
    try {
        var tokens = compiler.lexical("INC $10\n!erro ADC #10");
        test.ok(false);
    } catch (e){
        test.equal(1, e.erros.length);
        test.equal(5, e.tokens.length);
    }
    test.done();
};


exports.test_invalid_bnf = function(test){
    var tokens = compiler.lexical('INC "string"\n\n');
    try {
        var ast = compiler.syntax(tokens);
        test.ok(false);
    } catch (e){
        test.equal(1, e.erros.length);
    }
    test.done();
};

exports.test_invalid_bnf_2 = function(test){
    var tokens = compiler.lexical('INC "string"');
    try {
        var ast = compiler.syntax(tokens);
        test.ok(false);
    } catch (e){
        test.equal(1, e.erros.length);
    }
    test.done();
};


exports.test_invalid_semantic_2 = function(test){
    var tokens = compiler.lexical('INC "string"');
    var ast = [];
    try {
        ast = compiler.syntax(tokens);
        test.ok(false);
    } catch (e){
        test.equal(1, e.erros.length);
        test.equal(1, e.ast.length);
        ast = e.ast;
    }
    try {
        var data = compiler.semantic(ast);
    } catch (e){
        //console.log(e);
    }
    test.done();
};
