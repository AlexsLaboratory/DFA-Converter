function getId(string) {
  const regex = /\d+/gm;
  return regex.exec(string)[0];
}

function generateGraph(nodesArr, edgesArr, data, startState, endState = []) {
  let i = 0;
  for (const node in data) {
    const nodeId = getId(node);
    if (node == startState && endState.includes(node)) {
      nodesArr.push({
        id: nodeId,
        label: node,
        color: {
          background: "red"
        },
        font: {
          color: "white"
        },
        shape: "custom",
        ctxRenderer: ({ctx, id, x, y, state: {selected, hover}, style, label}) => {
          // do some math here
          const r = style.size;
          const width = r * 2;
          const height = r * 2;
          return {
            // bellow arrows
            // primarily meant for nodes and the labels inside of their boundaries
            drawNode() {
              ctx.beginPath();
              // ctx.strokeStyle = "#3885EB";
              ctx.strokeStyle = "black";
              ctx.translate(x, y);
              // ctx.fillStyle = "#97C2FC";
              ctx.fillStyle = "red";
              ctx.arc(0, 0, r, 0, Math.PI * 2, true); // Outer circle
              ctx.fill();
              ctx.stroke();
              ctx.moveTo(0, 0);
              ctx.beginPath();
              ctx.arc(0, 0, r * .5, 0, Math.PI * 2, true);  // Inner circle
              ctx.fill();
              ctx.stroke();
              ctx.lineWidth = 2;
              ctx.beginPath();
              ctx.fillStyle = "white";
              ctx.textAlign = "center";
              const textWidth = ctx.measureText(label).width;
              ctx.fillText(label, (r * .25) - (textWidth * .5), r * .0625);
            },
            drawExternalLabel() {
            },
            nodeDimensions: {width, height},
          };
        }
      });
    } else if (node != startState && endState.includes(node)) {
      nodesArr.push({
        id: nodeId,
        label: node,
        color: {
          background: "red"
        },
        font: {
          color: "white"
        },
        shape: "custom",
        ctxRenderer: ({ctx, id, x, y, state: {selected, hover}, style, label}) => {
          // do some math here
          const r = style.size;
          const width = r * 2;
          const height = r * 2;
          return {
            // bellow arrows
            // primarily meant for nodes and the labels inside of their boundaries
            drawNode() {
              ctx.beginPath();
              ctx.strokeStyle = "#3885EB";
              // ctx.strokeStyle = "black";
              ctx.translate(x, y);
              ctx.fillStyle = "#97C2FC";
              // ctx.fillStyle = "red";
              ctx.arc(0, 0, r, 0, Math.PI * 2, true); // Outer circle
              ctx.fill();
              ctx.stroke();
              ctx.moveTo(0, 0);
              ctx.beginPath();
              ctx.arc(0, 0, r * .5, 0, Math.PI * 2, true);  // Inner circle
              ctx.fill();
              ctx.stroke();
              ctx.lineWidth = 2;
              ctx.beginPath();
              ctx.fillStyle = "black";
              ctx.textAlign = "center";
              const textWidth = ctx.measureText(label).width;
              ctx.fillText(label, (r * .25) - (textWidth * .5), r * .0625);
            },
            drawExternalLabel() {
            },
            nodeDimensions: {width, height},
          };
        }
      })
    } else if (node == startState && !endState.includes(node)) {
      nodesArr.push({
        id: nodeId,
        label: node,
        color: {
          background: "red"
        },
        font: {
          color: "white"
        },
      })
    } else {
      nodesArr.push({id: nodeId, label: node});
    }
    const edges = data[node]
    for (const edge in edges) {
      const value = edges[edge];
      const valueId = getId(value);
      edgesArr.push({
        from: nodeId, to: valueId, label: edge, arrows: {
          to: {
            enabled: true,
            type: "arrow",
          },
        },
      })
    }
    i++;
  }
}

let nodes = [];
let edges = [];
let connectionObj = {"s0": {0: "s0", 1: "s1"}, "s1": {0: "s2", 1: "s0"}, "s2": {0: "s1", 1: "s2"}};
generateGraph(nodes, edges, connectionObj, "s0", ["s2"]);
let container = document.getElementById("mynetwork");
let data = {
  nodes: nodes,
  edges: edges
};
let network = new vis.Network(container, data, {});