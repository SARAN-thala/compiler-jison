const parser = function (tree) {
    if (typeof tree.left != 'number') {
        tree.left = parser(tree.left);
    }
    if (typeof tree.right != 'number') {
        tree.right = parser(tree.right);
    }
    tree.left = `(${tree.left}`;
    tree.right = `${tree.right})`;
    return (tree.left + tree.sym + tree.right);
};

exports.parse = parser;