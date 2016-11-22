const assert = require('assert');
const parser = require('../src/parser.js');

describe('parserTree', function () {
    it('should return nested tree structure ', function () {
        let givenTree = {
            sym: '-',
            left: {
                sym: '+',
                left: {
                    sym: '*',
                    left: 1,
                    right: 2
                },
                right: {
                    sym: '/',
                    left: 2,
                    right: 3
                }
            },
            right: {
                sym: '/',
                left: 3,
                right: 4
            }
        };


        let expectedExpr = '(((1*2)+(2/3))-(3/4))';
        assert.equal(parser.parse(givenTree), expectedExpr);
    });

    it('should return simple tree structure (symbol left right)', function () {
        let givenTree = {sym: '+', left: 1, right: 2};
        let expectedExpr = '(1+2)';
        assert.equal(parser.parse(givenTree), expectedExpr);
    });
});