class DFA {
  constructor(initialNode, nodes, terminalNode) {
    this.initialNode = initialNode;
    this.nodes = nodes;
    this.terminalNode = terminalNode;
  }

  getNextNode(currentNode, value) {
    for (let i = 0; i < currentNode.links.length; i++) {
      let link = currentNode.links[i];

      if (link.value == value) return link.destinationNode;
    }

    return null;
  }

  accepts(string) {
    let node = this.initialNode;

    for (let i = 0; i < string.length; i++) {
      let character = string[i];
      node = this.getNextNode(node, character);
    }

    for (let terminal of this.terminalNode) {
      let booleanTest = terminal.equals(node)
      if (booleanTest) return true;
    }
    return false;
  }
}


export {DFA}