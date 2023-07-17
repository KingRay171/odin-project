class Node {
  value;
  nextNode;
  constructor(value) {
    this.value = value;
    this.nextNode = null;
  }
}

class LinkedList {
  head;
  constructor(val) {
    this.head = new Node(val);
  }
  append = (val) => {
    let end = head;
    while (end.nextNode) {
      end = end.nextNode;
    }
    end.nextNode = new Node(val);
  };
  prepend = (val) => {
    let newHead = new Node(val);
    newHead.nextNode = this.head;
    this.head = newHead;
  };
  size = () => {
    let counter = 0;
    let ptr = this.head;
    while (ptr) {
      counter++;
      ptr = ptr.nextNode;
    }
    return counter;
  };
  getHead = () => {
    return this.head;
  };
  getTail = () => {
    let ptr = this.head;
    while (ptr.nextNode) {
      ptr = ptr.nextNode;
    }
    return ptr;
  };
  at = (idx) => {
    let i = 0;
    let node = this.head;
    while (i < idx) {
      node = node.nextNode;
      if (!node) {
        return null;
      }
      i++;
    }
    return node;
  };
  pop = () => {
    let node = this.head;
    if (!node.nextNode.nextNode) {
      node.nextNode = null;
      return;
    }
    while (node.nextNode.nextNode) {
      node = node.nextNode;
    }
    node.nextNode = null;
  };
  contains = (val) => {
    let node = this.head;
    while (node) {
      if (node.value === val) {
        return true;
      }
      node = node.nextNode;
    }
    return false;
  };
  find = (val) => {
    let idx = 0;
    let node = this.head;
    if (node.value === val) {
      return 0;
    }
    while (node.nextNode) {
      idx++;
      node = node.nextNode;
      if (node.value === val) {
        return idx;
      }
    }
    return -1;
  };
  toString = () => {
    let end = this.head;
    let str = "";
    while (end) {
      str += `${end.value} -> `;
      end = end.nextNode;
    }
    str += "null";
    return str;
  };
}

let ll = new LinkedList(23);
ll.prepend(69);
console.log(ll.toString());
console.log(ll.size());
console.log(ll.getTail());
console.log(ll.at(1));
console.log(ll.toString());
console.log(ll.contains(23));
console.log(ll.find(69));
