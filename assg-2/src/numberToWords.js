let mod = {};
const converter = require('number-to-words').toWords;

let operators = {
    '+': 'plus',
    '-': 'minus',
    '*': 'times',
    '/': 'by'
};

mod.parse = function (tree) {

    let symInWord = operators[tree.sym];

    if (tree.left.sym && tree.right.sym){
        return `(${this.parse(tree.left)} ${symInWord} ${this.parse(tree.right)})`;
    }
    if (tree.left.sym && !tree.right.sym){
        return `(${this.parse(tree.left)} ${symInWord} ${converter(tree.right)})`;
    }
    if (!tree.left.sym && tree.right.sym){
        return `(${converter(tree.left)} ${symInWord} ${this.parse(tree.right)})`;
    }
    return `(${converter(tree.left)} ${symInWord} ${converter(tree.right)})`;
};

module.exports = mod;
