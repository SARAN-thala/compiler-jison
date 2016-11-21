const inWord = require('in-words').en;

let operators = {
    '+': 'plus',
    '-': 'minus',
    '*': 'times',
    '/': 'by'
};

const parser = function (tree) {

    let symWord = operators[tree.sym];

    if (tree.left.sym && tree.right.sym){
        return `(${parser(tree.left)} ${symWord} ${parser(tree.right)})`;
    }
    if (tree.left.sym && !tree.right.sym){
        return `(${parser(tree.left)} ${symWord} ${inWord(tree.right)})`;
    }
    if (!tree.left.sym && tree.right.sym){
        return `(${inWord(tree.left)} ${symWord} ${parser(tree.right)})`;
    }
    return `(${inWord(tree.left)} ${symWord} ${inWord(tree.right)})`;
};

exports.parse = parser;


