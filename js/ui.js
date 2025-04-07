export function updateOutput(value) {
  const output = document.getElementById("output");
  output.textContent = value;
}

export function clearOutput() {
  updateOutput("0");
}

export function getOutputValue() {
  return document.getElementById("output").textContent;
}

export function appendToOutput(char) {
  const current = getOutputValue();
  if (current === "0" && char !== ".") {
    updateOutput(char);
  } else {
    updateOutput(current + char);
  }
}

export function updateExpression(value) {
  document.getElementById("expression").textContent = value;
}

export function clearExpression() {
  updateExpression("");
}

export function appendToExpression(char) {
  const current = document.getElementById("expression").textContent;
  updateExpression(current + char);
}
