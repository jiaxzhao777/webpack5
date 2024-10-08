const t = require("babel-types");

const visitor = {
  BinaryExpression(path) {
    const node = path.node;

    let result;

    if (t.isNumericLiteral(node.left) && t.isNumericLiteral(node.right)) {
      switch (node.operator) {
        case "+":
          result = node.left.value + node.right.value;
          break;
        case "-":
          result = node.left.value - node.right.value;
          break;
        case "*":
          result = node.left.value * node.right.value;
          break;
        case "/":
          result = node.left.value / node.right.value;
          break;
        default:
          break;
      }
    }

    if (result !== undefined) {
      path.replaceWith(t.numericLiteral(result));

      let parentPath = path.parentPath;
      parentPath && visitor.BinaryExpression.call(this, parentPath);
    }
  },
};

module.exports = function (babel) {
  return {
    visitor,
  };
};
