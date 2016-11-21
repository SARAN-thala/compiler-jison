const parser = {};

parser.makeList = function (val1, sym, val2) {
    val1 = `(${val1}`;
    val2 = `${val2})`;
    return (val1 + sym + val2)
};

module.exports = parser;