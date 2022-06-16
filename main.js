import {Node} from "./classes/Node.js";
import {DFA} from "./classes/DFA.js";
import {Edge} from "./classes/Edge.js";
import {addRow} from "./table.js";
import {generateGraph} from "./functions/generate-graph.js";

const table = document.querySelector(".tg");
const tableBody = table.querySelector("tbody");

let nodeObjArr = [];

let alphabetArr = [];
let startState = "";
let finalState = [];
let nodeArr = [];

document.addEventListener("focusout", (e) => {
  switch (e.target.id) {
    case "possible-states": {
      nodeArr = e.target.value.split(" ");
      break;
    }
    case "alphabet": {
      let alphabet = e.target.value.toString().trim();
      alphabetArr = alphabet.split(" ");
      table.innerHTML = "";
      nodeObjArr = [];
      nodeArr.forEach((element) => {
        nodeObjArr.push(new Node(element));
        addRow(table, element, alphabetArr);
      });
      break;
    }
    case "start-state": {
      startState = e.target.value.trim();
      break;
    }
    case "final-state": {
      finalState = e.target.value.trim().split(" ");
      break;
    }
  }
});

let testStringContainer = document.querySelector("#test-string-container");
let index = 2;
document.addEventListener("click", (e) => {
  switch (e.target.id) {
    case "run-dfa": {
      generateResult();
      break;
    }
    case "new-test-button": {
      let divElement = document.createElement("div");
      divElement.classList.add("input-item-container");
      let labelElement = document.createElement("label");
      labelElement.setAttribute("for", `string-${index}`);
      labelElement.textContent = `Test String ${index}: `;
      let inputElement = document.createElement("input");
      inputElement.type = "text";
      inputElement.id = `string-${index}`;
      divElement.appendChild(labelElement);
      divElement.appendChild(inputElement);
      testStringContainer.appendChild(divElement);
      index++;
    }
  }
});

function findNode(array, searchValue) {
  for (let i = 0; i < array.length; i++) {
    if (array[i].val == searchValue) return array[i];
  }
  throw Error("Node could not be found");
}

function findNodes(array, searchValue = []) {
  let result = [];
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < searchValue.length; j++) {
      if (array[i].val == searchValue[j]) result.push(array[i]);
    }
  }
  if (result.length === 0) throw Error("Nodes could not be found");
  return result;
}

let connectionObj = {"s0": {0: "s0", 1: "s1"}, "s1": {0: "s2", 1: "s0"}, "s2": {0: "s1", 1: "s2"}};

function tableToObject(table) {
  let nodeObj = {};
  let rowLength = table.rows.length;
  for (let i = 0; i < rowLength; i++) {
    let cellLength = table.rows[i].cells.length;
    let subObj = {};
    let currentNode = "";
    for (let j = 0; j < cellLength; j++) {
      const cell = table.rows[i].cells[j];
      currentNode = table.rows[i].cells[0].textContent;
      if (j !== 0) {
        let key = cell.querySelector("input[type='hidden']").value;
        subObj[key] = cell.querySelector("input[type='text']").value;
      }
    }
    nodeObj[currentNode] = subObj;
  }

  let nodes = [];
  let edges = [];
  // let connectionObj = {"s0": {0: "s0", 1: "s1"}, "s1": {0: "s2", 1: "s0"}, "s2": {0: "s1", 1: "s2"}};
  generateGraph(nodes, edges, nodeObj, startState, finalState);
  let container = document.getElementById("mynetwork");
  let data = {
    nodes: nodes,
    edges: edges
  };
  let network = new vis.Network(container, data, {});

  return nodeObj;
}


function generateResult() {
  const data = tableToObject(table);
  // const data = connectionObj;
  for (const node in data) {
    let sourceNode = findNode(nodeObjArr, node);
    for (const edge in data[node]) {
      let destinationNode = findNode(nodeObjArr, data[node][edge]);
      let currentEdge = new Edge(sourceNode, edge, destinationNode);
      sourceNode.createEdge(currentEdge);
    }
  }

  let a = new DFA(findNode(nodeObjArr, startState), nodeObjArr, findNodes(nodeObjArr, finalState));

  const inputElement = document.querySelectorAll("#test-string-container input");
  inputElement.forEach((element) => {
    let string = element.value;
    if (a.accepts(string)) {
      element.style.border = "2px solid green";
    } else {
      element.style.border = "2px solid red";
    }
  });
}