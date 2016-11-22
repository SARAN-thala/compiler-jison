const assert = require('assert');
const inWords = require('../src/numberToWords.js');


describe('numberToWords', function () {

    it('should return nested tree structure in words ', function () {
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


        let expectedExpr = '(((one times two) plus (two by three)) minus (three by four))';
        assert.equal(inWords.parse(givenTree), expectedExpr);
    });

    it('should return words in tree structure (symbol left right)', function () {
        let givenTree = {left: 1, sym: '+', right: 2};
        let expectedExpr = '(one plus two)';
        assert.equal(inWords.parse(givenTree), expectedExpr);
    });

    it('should return words in tree structure when passing very large numbers', function () {
        let givenTree = {left: 1000000000, sym: '+', right: 2};
        let expectedExpr = '(one billion plus two)';
        assert.equal(inWords.parse(givenTree), expectedExpr);
    });
});