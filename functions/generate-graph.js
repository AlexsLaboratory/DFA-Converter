function getId(string) {
  const regex = /\d+/gm;
  return regex.exec(string)[0];
}

function canvasArrow(context, fromx, fromy, tox, toy) {
  let headlen = 10; // length of head in pixels
  let dx = tox - fromx;
  let dy = toy - fromy;
  let angle = Math.atan2(dy, dx);
  context.moveTo(fromx, fromy);
  context.lineTo(tox, toy);
  context.lineTo(tox - headlen * Math.cos(angle - Math.PI / 6), toy - headlen * Math.sin(angle - Math.PI / 6));
  context.moveTo(tox, toy);
  context.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6), toy - headlen * Math.sin(angle + Math.PI / 6));
}

function generateGraph(nodesArr, edgesArr, data, startState, endState = []) {
  let i = 0;
  for (const node in data) {
    const nodeId = getId(node);
    if (node == startState && endState.includes(node)) {
      nodesArr.push({
        id: nodeId,
        label: node,
        shape: "custom",
        ctxRenderer: ({ctx, id, x, y, state: {selected, hover}, style, label}) => {
          const r = style.size;
          const diameter = r * 2;
          return {
            drawNode() {
              ctx.beginPath();
              canvasArrow(ctx, x - r + 75, y - r + 75, x + r, y + r);
              ctx.strokeStyle = "red";
              ctx.stroke();
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
              ctx.lineWidth = 2;
              ctx.arc(0, 0, r * .5, 0, Math.PI * 2, true);  // Inner circle
              ctx.fill();
              ctx.stroke();
              ctx.beginPath();
              ctx.fillStyle = "black";
              ctx.textAlign = "center";
              const textWidth = ctx.measureText(label).width;
              ctx.fillText(label, (r * .25) - (textWidth * .5), r * .0625);
            },
            drawExternalLabel() {
            },
            nodeDimensions: {diameter, diameter},
          };
        }
      });
    } else if (node != startState && endState.includes(node)) {
      nodesArr.push({
        id: nodeId,
        label: node,
        shape: "custom",
        ctxRenderer: ({ctx, id, x, y, state: {selected, hover}, style, label}) => {
          const r = style.size;
          const diameter = r * 2;
          return {
            drawNode() {
              ctx.beginPath();
              ctx.strokeStyle = "#3885EB";
              ctx.translate(x, y);
              ctx.fillStyle = "#97C2FC";
              ctx.arc(0, 0, r, 0, Math.PI * 2, true); // Outer circle
              ctx.fill();
              ctx.stroke();
              ctx.moveTo(0, 0);
              ctx.beginPath();
              ctx.lineWidth = 2;
              ctx.arc(0, 0, r * .5, 0, Math.PI * 2, true);  // Inner circle
              ctx.fill();
              ctx.stroke();
              ctx.beginPath();
              ctx.fillStyle = "black";
              ctx.textAlign = "center";
              const textWidth = ctx.measureText(label).width;
              ctx.fillText(label, (r * .25) - (textWidth * .5), r * .0625);
            },
            drawExternalLabel() {
            },
            nodeDimensions: {diameter, diameter},
          };
        }
      })
    } else if (node == startState && !endState.includes(node)) {
      nodesArr.push({
        id: nodeId,
        label: node,
        color: {
          background: "red",
          highlight: "red"
        },
        font: {
          color: "white"
        },
        shape: "custom",
        ctxRenderer: ({ctx, id, x, y, state: {selected, hover}, style, label}) => {
          const r = style.size;
          const diameter = r * 2;
          return {
            drawNode() {
              ctx.beginPath();
              canvasArrow(ctx, x - r + 75, y - r + 75, x + r, y + r);
              ctx.strokeStyle = "red";
              ctx.stroke();
              ctx.beginPath();
              ctx.strokeStyle = "#3885EB";
              ctx.translate(x, y);
              ctx.fillStyle = "#97C2FC";
              ctx.arc(0, 0, r, 0, Math.PI * 2, true);
              ctx.fill();
              ctx.stroke();
              ctx.moveTo(0, 0);
              ctx.beginPath();
              ctx.fillStyle = "black";
              ctx.textAlign = "center";
              const textWidth = ctx.measureText(label).width;
              ctx.fillText(label, (r * .25) - (textWidth * .5), r * .0625);
            },
            drawExternalLabel() {
            },
            nodeDimensions: {diameter, diameter},
          };
        }

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

export {generateGraph};