class Node {
  constructor(val) {
    this.val = val;
    this.links = [];
  }

  createEdge(link) {
    this.links.push(link);
  }

  toString() {
    let node = "(%s):\n" % this.val;

    for (let i = i; i < this.links.length; i++) {
      let link = this.links[i];
      node += `\t${link}\n`
    }
    return node;
  }

  equals(node) {
    let check = this.val === node.val;

    if (this.links.length === node.links.length) {
      for (let i = 0; i < this.links.length; i++) {
        check = check && this.links[i] == node.links[i];
      }
      return check;
    } else {
      return false;
    }
  }
}
export {Node};