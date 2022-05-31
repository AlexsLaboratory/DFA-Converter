function addRow(tableElement, nodeName, alphabetArr) {
  const newRow = tableElement.insertRow(-1);

  const nodeNameCell = newRow.insertCell(0);
  nodeNameCell.appendChild(document.createTextNode(nodeName));

  alphabetArr.forEach((element, index) => {
    let edgeInputCell = newRow.insertCell(index + 1);
    edgeInputCell.appendChild(generateFieldInput(element, index));
  })
}

function generateFieldInput(element, index) {
  const divElement = document.createElement("div");
  let labelElement = document.createElement("label");
  labelElement.setAttribute("for", `${element}-${index}`);
  labelElement.textContent = `${element}: `;
  let inputElement = document.createElement("input");
  inputElement.type = "text";
  inputElement.id = `${element}-${index}`;
  let hiddenElement = document.createElement("input");
  hiddenElement.type = "hidden";
  hiddenElement.value = element;
  divElement.appendChild(labelElement);
  divElement.appendChild(inputElement);
  divElement.appendChild(hiddenElement);
  return divElement;
}

export {addRow};
