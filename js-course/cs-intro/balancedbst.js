class Node {
  value;
  LNode;
  RNode;
  constructor(val, LNode, RNode) {
    this.value = val;
    this.LNode = LNode;
    this.RNode = RNode;
  }
}

class Tree {
  root;
  constructor(arr) {
    this.root = this.buildTree(arr);
  }
  buildTree = function (arr) {
    if (arr.length === 0) return null;
    const mid = Math.floor(arr.length / 2);
    let node = new Node(
      arr[mid],
      this.buildTree(arr.slice(0, mid)),
      this.buildTree(arr.slice(mid + 1))
    );
    return node;
  };
  insert = (val) => {
    let node = this.root;
    while (node) {
      if (val > node.value) {
        node = node.RNode;
        if (!node.RNode && val > node.value) {
          node.RNode = new Node(val);
          return;
        } else if (!node.LNode && val < node.value) {
          node.LNode = new Node(val);
          return;
        }
      } else if (val < node.value) {
        node = node.LNode;
        if (!node.LNode && val < node.value) {
          node.LNode = new Node(val);
          return;
        } else if (!node.RNode && val > node.value) {
          node.RNode = new Node(val);
          return;
        }
      }
    }
    node = new Node(val);
  };

  delete = (val) => {
    let node = this.root;
    let parent = null;
    while (node.value !== val) {
      if (node.value > val) {
        parent = node;
        node = node.LNode;
      } else if (node.value < val) {
        parent = node;
        node = node.RNode;
      }
    }

    if (!node.RNode && !node.LNode) node = null;
    else if (!node.RNode && node.LNode) node = node.LNode;
    else if (node.RNode && !node.LNode) node = node.RNode;
    else {
      let succ = node.RNode;
      while (succ.LNode) {
        succ = succ.LNode;
      }
      if (parent.LNode.value === node.value) {
        parent.LNode = succ;
      } else if (parent.RNode.value === node.value) {
        parent.RNode = succ;
      }
    }
  };
  find = (val) => {
    let node = this.root;
    if (node.value === val) return node;
    while (node.value !== val) {
      if (node.value > val) node = node.LNode;
      else node = node.RNode;
    }
    return node;
  };

  levelOrder = (callback) => {
    const result = [];
    const queue = [this.root];

    while (queue.length !== 0) {
      const current = queue.shift();
      if (!current) continue;
      result.push(current);
      if (current.RNode) queue.push(current.RNode);
      if (current.LNode) queue.push(current.LNode);
    }

    if (!callback) return result;
    result.forEach((e) => callback(e));
  };
  inorder = (callback, node, result) => {
    if (!node) return;
    this.inorder(callback, node.LNode, result);
    callback ? callback(node) : result.push(node);
    this.inorder(callback, node.RNode, result);
    if (result) return result;
  };
  preorder = (callback, node, result) => {
    if (!node) return;
    callback ? callback(node) : result.push(node);
    this.preorder(callback, node.LNode);
    this.preorder(callback, node.RNode);
    if (result) return result;
  };
  postorder = (callback, node, result) => {
    if (!node) return;
    this.postorder(callback, node.LNode);
    this.postorder(callback, node.RNode);
    callback ? callback(node) : result.push(node);

    if (result) return result;
  };
  length = (node) =>
    node ? Math.max(this.length(node.LNode), this.length(node.RNode)) + 1 : 0;

  depth = (node) => {
    let nodeToFind = this.root;
    if (node.value === this.root.value) return 0;
    let counter = 0;
    while (node.value !== nodeToFind.value) {
      if (node.value > nodeToFind.value) {
        nodeToFind = nodeToFind.RNode;
      } else {
        nodeToFind = nodeToFind.LNode;
      }
      counter++;
    }
    return counter;
  };
  isBalanced = () => {
    console.log(
      this.inorder(null, this.root, []).every(
        (e) => Math.abs(this.length(e.LNode) - this.length(e.RNode)) < 2
      )
    );
  };
  rebalance = () => {
    this.buildTree(this.inorder(null, this.root, []).sort((a, b) => a - b));
  };
}

let tree = new Tree([3, 5, 7]);
tree.insert(4);
tree.insert(2);
tree.rebalance();
