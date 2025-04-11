import {
  updateOutput,
  clearOutput,
  getOutputValue,
  appendToOutput,
  updateExpression,
  clearExpression,
} from "./ui.js";
import {
  memoryAdd,
  memorySubtract,
  memoryRecall,
  memoryClear,
} from "./memory.js";

let current = "0";
let operator = null;
let firstOperand = null;
let resetNext = false;
let baseConverted = false;

const buttons = document.querySelectorAll(
  ".buttons .btn, .memory-bar .btn, .delete-btn"
);
buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const action = btn.dataset.action || btn.textContent.trim();
    handleButtonClick(action);
  });
});

function handleButtonClick(label) {
  if (!isNaN(label)) return handleNumber(label);

  switch (label) {
    case ".":
      return handleDecimal();
    case "+":
    case "-":
    case "×":
    case "÷":
    case "^n":
      return handleOperator(label);
    case "=":
      return calculate();
    case "C":
      return clear();
    case "%":
      return handlePercent();
    case "+/-":
      return toggleSign();
    case "x!":
      return factorial();
    case "√x":
      return squareRoot();
    case "MC":
      return memoryClear();
    case "MR":
      updateOutput(memoryRecall());
      resetNext = true;
      return;
    case "M+":
      return memoryAdd(parseFloat(getOutputValue()));
    case "M-":
      return memorySubtract(parseFloat(getOutputValue()));
    case "BIN":
      return convertBase("bin");
    case "HEX":
      return convertBase("hex");
    case "DEC":
      return convertBase("dec");
    case "⌫":
      return handleDelete();
  }
}

function handleNumber(num) {
  if (resetNext) {
    updateOutput(num);
    resetNext = false;
  } else {
    appendToOutput(num);
  }
  baseConverted = false;
}

function handleDecimal() {
  let value = getOutputValue().trim();
  if (value === "" || /[+\-×÷^n]$/.test(value)) {
    appendToOutput("0.");
  } else {
    let number = value.split(" ");
    if (!number[number.length - 1].includes(".")) {
      appendToOutput(".");
    }
  }
}

function handleOperator(op) {
  const value = getOutputValue();

  if (baseConverted) {
    updateOutput("Error");
    return;
  }

  if (resetNext) {
    resetNext = false;
  }

  if (/[+\-×÷] $/.test(value)) return;

  updateOutput(value + " " + op + " ");
}

function calculate() {
  let expr = getOutputValue().trim();

  try {
    let parsed = expr
      .replace(/×/g, "*")
      .replace(/÷/g, "/")
      .replace(/\^n/g, "**");

    parsed = parsed.trim();

    if (/[+\-*/]$/.test(parsed)) {
      parsed = parsed.slice(0, -1).trim();
    }

    if (!parsed) return updateOutput("0");

    const result = eval(parsed);
    if (!isFinite(result)) throw new Error("Division by zero");

    updateExpression(expr);
    updateOutput(result);
    resetNext = true;
    baseConverted = false;

    addToHistory(`${expr} = ${result}`);
  } catch (e) {
    updateOutput("Error");
  }
}

function clear() {
  updateOutput("0");
  updateExpression("");
  resetNext = false;
  baseConverted = false;
}

function handlePercent() {
  updateOutput(parseFloat(getOutputValue()) / 100);
}

function toggleSign() {
  let value = getOutputValue().trim();

  let tokens = value.split(" ");

  if (tokens.length === 1) {
    let num = parseFloat(tokens[0]);
    updateOutput((num * -1).toString());
  } else {
    let last = tokens[tokens.length - 1];
    let num = parseFloat(last);
    if (isNaN(num)) return;

    num *= -1;
    tokens[tokens.length - 1] = num.toString();
    updateOutput(tokens.join(" "));
  }
}

function squareRoot() {
  updateOutput(Math.sqrt(parseFloat(getOutputValue())));
}

function factorial() {
  const num = parseInt(getOutputValue());
  if (num < 0) return updateOutput("Error");
  let result = 1;
  for (let i = 2; i <= num; i++) result *= i;
  updateOutput(result);
}

function convertBase(type) {
  const raw = getOutputValue().trim();
  const value = raw.toUpperCase().replace(/[^0-9A-F]/gi, "");

  let result;
  switch (type) {
    case "bin": {
      const num = parseInt(value, 10);
      if (isNaN(num)) return updateOutput("Error");
      result = num.toString(2);
      break;
    }
    case "hex": {
      const num = parseInt(value, 10);
      if (isNaN(num)) return updateOutput("Error");
      result = num.toString(16).toUpperCase();
      break;
    }
    case "dec": {
      if (/^[01]+$/.test(value)) {
        result = parseInt(value, 2);
      } else if (/^[0-9A-F]+$/.test(value)) {
        result = parseInt(value, 16);
      } else if (!isNaN(parseFloat(value))) {
        result = parseFloat(value);
      } else {
        return updateOutput("Error");
      }
      break;
    }
  }

  updateOutput(result.toString());
  updateExpression(`${raw} → ${type.toUpperCase()}`);
  resetNext = true;
  baseConverted = type !== "dec";
}

function handleDelete() {
  let current = getOutputValue().trim();

  if (current === "Error" || current.length <= 1) {
    updateOutput("0");
    return;
  }

  if (/[+\-×÷^n]$/.test(current)) {
    const newValue = current.slice(0, -3).trim();
    updateOutput(newValue || "0");
  } else {
    const newValue = current.slice(0, -1).trim();
    updateOutput(newValue || "0");
  }
}
