const historyBtn = document.getElementById("history");
const insertBtn = document.getElementById("insert");
const historyPanel = document.getElementById("historyPanel");
const clearHistoryBtn = document.getElementById("clearHistoryBtn");
const historyList = document.getElementById("historyList");

let copiedItem = "";
let history = JSON.parse(localStorage.getItem("calcHistory") || "[]");
renderHistory();

function addToHistory(newItem) {
  history.push(newItem);
  localStorage.setItem("calcHistory", JSON.stringify(history));
  renderHistory();
}

function renderHistory() {
  historyList.innerHTML = "";
  history.forEach((item) => {
    const div = document.createElement("div");
    div.textContent = item;
    div.className = "history-item";
    div.onclick = () => {
      copiedItem = item.split("=")[0].trim();
      navigator.clipboard.writeText(copiedItem);
      alert("Copied into the buffer 😺");
    };
    historyList.appendChild(div);
  });
}

historyBtn.onclick = () => {
  historyPanel.classList.toggle("hidden");
};

insertBtn.onclick = () => {
  if (copiedItem) updateOutput(copiedItem);
};

clearHistoryBtn.onclick = () => {
  history = [];
  localStorage.removeItem("calcHistory");
  renderHistory();
};

function updateOutput(value) {
    const output = document.getElementById("output");
    output.textContent = value;
} 