const inWord = require('in-words').en;

let operators = {
    '+': 'plus',
    '-': 'minus',
    '*': 'times',
    '/': 'by'
};

const parser = function (tree) {
    // let leftWord = inWord(tree.left);
    // let rightWord = inWord(tree.right);
    let symWord = operators[tree.sym];

    if (!tree.left.sym && !tree.right.sym){
        return `(${inWord(tree.left)} ${symWord} ${inWord(tree.right)})`;
    }
    if (tree.left.sym && tree.right.sym){
        return `(${parser(tree.left)} ${symWord} ${parser(tree.right)})`;
    }
    if (tree.left.sym && !tree.right.sym){
        return `(${parser(tree.left)} ${symWord} ${inWord(tree.right)})`;
    }
    if (!tree.left.sym && tree.right.sym){
        return `(${inWord(tree.left)} ${symWord} ${parser(tree.right)})`;
    }

    // if (typeof tree.left != 'number') {
    //     tree.left = parser(tree.left);
    // }
    // if (typeof tree.right != 'number') {
    //     tree.right = parser(tree.right);
    // }
    //
    // return `${leftWord} ${symWord} ${rightWord}`;
};

exports.parse = parser;

