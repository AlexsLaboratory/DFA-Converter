class Edge {
  constructor(sourceNode, value, destinationNode) {
    this.sourceNode = sourceNode;
    this.value = value;
    this.destinationNode = destinationNode;
  }

  toString() {
    return `${this.sourceNode.val} --${this.value}--> ${this.destinationNode.val}`;
  }

  equals(link) {
    return this.sourceNode == link.sourceNode && this.value == link.value && this.destinationNode == link.destinationNode;
  }

}

export {Edge}