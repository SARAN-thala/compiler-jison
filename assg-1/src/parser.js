let mod = {};

mod.parse = function (tree) {
    let open = '(';
    let close = ')';
    if (tree.left  instanceof Object) {
        tree.left = this.parse(tree.left);
    }
    if (tree.right  instanceof Object) {
        tree.right = this.parse(tree.right);
    }
    return [open,tree.left, tree.sym ,tree.right,close].join('');
};

module.exports= mod;